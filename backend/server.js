const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Blockchain contract
const contract = require("./blockchain/contract");

const app = express();
app.use(express.json());
app.use(cors());

/* ===============================
   Gemini AI Setup
================================ */

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

/* ===============================
   Create Medicine Batch
================================ */

app.post("/createBatch", async (req, res) => {

    try {

        const { batchId, name, manufacturer, expiryDate } = req.body;

        const tx = await contract.createBatch(
            batchId,
            name,
            manufacturer,
            expiryDate
        );

        await tx.wait();

        const qr = await QRCode.toDataURL(batchId);

        res.json({
            message: "Batch stored on blockchain",
            qrCode: qr
        });

    } catch (err) {

        console.log(err);

        res.json({
            error: "Blockchain transaction failed"
        });

    }

});

/* ===============================
   Verify Medicine
================================ */

app.get("/verify/:batchId", async (req, res) => {

    try {

        const batchId = req.params.batchId;

        const med = await contract.getMedicine(batchId);

        // If medicine does not exist
        if (!med || med[0] === "") {

            return res.json({
                status: "Fake or Unknown"
            });

        }

        res.json({
            status: "Authentic",
            medicine: {
                batchId: med[0],
                name: med[1],
                manufacturer: med[2],
                expiryDate: med[3].toString(),
                owner: med[4]
            }
        });

    } catch (err) {

        console.log(err);

        res.json({
            status: "Fake or Unknown"
        });

    }

});

/* ===============================
   Transfer Ownership
================================ */

app.post("/transfer", async (req, res) => {

    try {

        const { batchId, newOwner } = req.body;

        const tx = await contract.transferMedicine(
            batchId,
            newOwner
        );

        await tx.wait();

        res.json({
            message: "Ownership transferred on blockchain"
        });

    } catch (err) {

        res.json({
            error: err.message
        });

    }

});

/* ===============================
   AI Assistant Endpoint
================================ */

app.post("/askAI", async (req, res) => {

    try {

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

    } catch (err) {

        console.log("AI ERROR:", err);

        res.json({
            answer: "AI service error. Please try again."
        });

    }

});

/* ===============================
   Start Server
================================ */

app.listen(5000, () => {

    console.log("Backend running on port 5000");

});