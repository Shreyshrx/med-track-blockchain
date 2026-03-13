const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

/* ===============================
   Gemini AI Setup
================================ */

const genAI = new GoogleGenerativeAI("YOURAIzaSyBfBYbsHvYsEa57DBrn8bGDeCN6c6QsK7M_GEMINI_API_KEY");

/* ===============================
   In-memory medicine storage
================================ */

let medicines = {};

/* ===============================
   Create Medicine Batch
================================ */

app.post("/createBatch", async (req, res) => {

    const { batchId, name, manufacturer } = req.body;

    medicines[batchId] = {
        batchId,
        name,
        manufacturer,
        history: [
            {
                stage: "Manufactured",
                location: manufacturer,
                time: new Date().toLocaleString()
            }
        ]
    };

    const qr = await QRCode.toDataURL(batchId);

    res.json({
        message: "Batch created",
        qrCode: qr
    });

});

/* ===============================
   Verify Medicine
================================ */

app.get("/verify/:batchId", (req, res) => {

    const batchId = req.params.batchId;
    const med = medicines[batchId];

    if(!med){
        return res.json({ status: "Fake or Unknown" });
    }

    res.json({
        status: "Authentic",
        medicine: med
    });

});

/* ===============================
   AI Assistant Endpoint
================================ */

app.post("/askAI", async (req,res)=>{

    try{

        const { question, medicine } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = `
You are a helpful medical assistant.

Medicine Data:
${JSON.stringify(medicine)}

User Question:
${question}

Explain clearly in simple language.
`;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        });

        const response = result.response;
        const text = response.text();

        res.json({ answer: text });

    }catch(err){

        console.log("AI ERROR:", err);

        res.json({
            answer: "AI service error. Please try again."
        });

    }

});

app.post("/transfer", (req,res)=>{

const { batchId, stage, location } = req.body;

if(!medicines[batchId]){
return res.json({message:"Batch not found"});
}

medicines[batchId].history.push({
stage,
location,
time: new Date().toLocaleString()
});

res.json({
message:"Transfer recorded",
medicine: medicines[batchId]
});

});

/* ===============================
   Start Server
================================ */

app.listen(5000, ()=>{
    console.log("Backend running on port 5000");
});