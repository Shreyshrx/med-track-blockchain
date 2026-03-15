const fs = require("fs");
const csv = require("csv-parser");
const contract = require("./blockchain/contract");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function uploadDataset() {

  const medicines = [];

  fs.createReadStream("./dataset/medicines.csv")
    .pipe(csv())
    .on("data", (row) => medicines.push(row))
    .on("end", async () => {

      console.log("Uploading dataset to blockchain...\n");

      for (const med of medicines) {

        try {

          // check if medicine already exists
          const existing = await contract.getMedicine(med.batchId);

          if (existing && existing[0] !== "") {
            console.log(`Skipped (already exists): ${med.batchId}\n`);
            continue;
          }

          const tx = await contract.createBatch(
            med.batchId,
            med.name,
            med.manufacturer,
            med.expiryDate
          );

          console.log(`Transaction sent for ${med.batchId}`);

          await tx.wait();

          console.log(`Uploaded: ${med.batchId}\n`);

          await delay(1000);

        } catch (err) {

          console.log(`Error uploading: ${med.batchId}`);
          console.log(err.reason || err.message);
          console.log("");

        }

      }

      console.log("Dataset upload complete");

    });
}

uploadDataset();