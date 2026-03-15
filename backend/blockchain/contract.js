const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const wallet = new ethers.Wallet(
"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
provider
);

const contractJson = require("../../medtrack-blockchain/artifacts/contracts/MedicineTracking.sol/MedicineTracking.json");

const abi = contractJson.abi;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contract = new ethers.Contract(
contractAddress,
abi,
wallet
);

module.exports = contract;


