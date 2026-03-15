const hre = require("hardhat");

async function main() {

  const MedicineTracking =
    await hre.ethers.getContractFactory("MedicineTracking");

  const contract = await MedicineTracking.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed at:",
    await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

