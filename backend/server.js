
const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let medicines = {};

// create batch
app.post("/createBatch", async (req, res) => {
    const { batchId, name, manufacturer } = req.body;

    medicines[batchId] = {
        batchId,
        name,
        manufacturer,
        created: Date.now()
    };

    const qr = await QRCode.toDataURL(batchId);

    res.json({
        message: "Batch created",
        qrCode: qr
    });
});

// verify medicine
app.get("/verify/:batchId", (req, res) => {
    const batchId = req.params.batchId;
    const med = medicines[batchId];

    if(!med){
        return res.json({status:"Fake or Unknown"});
    }

    res.json({
        status:"Authentic",
        medicine: med
    });
});

app.listen(5000, ()=>{
    console.log("Backend running on port 5000");
});
