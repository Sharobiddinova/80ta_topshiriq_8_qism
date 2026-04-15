require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

const networks = {
  hardhat: {},
  localhost: {
    url: "http://127.0.0.1:8545"
  }
};

if (process.env.RPC_URL && process.env.PRIVATE_KEY) {
  networks.sepolia = {
    url: process.env.RPC_URL,
    accounts: [process.env.PRIVATE_KEY]
  };
}

module.exports = {
  solidity: "0.8.24",
  networks
};
