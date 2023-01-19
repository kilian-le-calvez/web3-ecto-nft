require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    matic: {
      url: process.env.QUICK_NODE_URL,
      accounts: [ process.env.PRIVATE_KEY_MATIC_TESTNET ],
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_SCAN_API_KEY,
    }
  }
};
