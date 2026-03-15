const contract = require("./blockchain/contract");

async function run() {

  const medicine = await contract.medicines("BATCH001");

  console.log("Medicine Data:");
  console.log(medicine);

}

run();

