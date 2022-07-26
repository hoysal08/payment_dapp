require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

const dotenv = require("dotenv");
dotenv.config({path: __dirname + '/.env'});
const { API_URL, PRIVATE_KEY } = process.env



module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: API_URL,
      accounts: [ PRIVATE_KEY] 
    }
  },
  etherscan: {
    apiKey:"UI4FGJMAM6AG8FHZS1XY95KKS3TFXDEISW"
  },

  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
