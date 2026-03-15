const { ethers } = require("ethers");

// Sepolia RPC from Alchemy
const provider = new ethers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/rywYOqNF1XpV6E1-RQPSt"
);

// Wallet with private key
const wallet = new ethers.Wallet(
  "0x6fdb3439c3fd2aa47c3d75da68ff510e9ad222625e696ae042887c98c2bcf834",
  provider
);

// Import contract ABI
const contractJson = require("../../medtrack-blockchain/artifacts/contracts/MedicineTracking.sol/MedicineTracking.json");
const abi = contractJson.abi;

// Deployed contract address
const contractAddress = "0xEC7Bf2dE09126b0b43aFF9bb598e5044D1aF4b23";

// Create contract instance
const contract = new ethers.Contract(
  contractAddress,
  abi,
  wallet
);

module.exports = contract;