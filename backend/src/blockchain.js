const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const abiCandidates = [
  path.join(__dirname, "..", "contractABI.json"),
  path.join(
    __dirname,
    "..",
    "..",
    "artifacts",
    "contracts",
    "SupplyChainLogistics.sol",
    "SupplyChainLogistics.json"
  )
];

let cachedContract = null;

function loadAbi() {
  for (const abiPath of abiCandidates) {
    if (!fs.existsSync(abiPath)) {
      continue;
    }

    const raw = JSON.parse(fs.readFileSync(abiPath, "utf8"));
    return Array.isArray(raw) ? raw : raw.abi;
  }

  throw new Error(
    "Contract ABI topilmadi. `npm run compile && npm run export:abi` buyrug'ini ishga tushiring."
  );
}

function getContract() {
  if (cachedContract) {
    return cachedContract;
  }

  const rpcUrl = process.env.RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (!rpcUrl || !privateKey || !contractAddress) {
    throw new Error(
      "RPC_URL, PRIVATE_KEY va CONTRACT_ADDRESS .env faylida bo'lishi shart."
    );
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  const abi = loadAbi();

  cachedContract = new ethers.Contract(contractAddress, abi, signer);
  return cachedContract;
}

module.exports = {
  getContract
};

