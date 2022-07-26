const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const HoysalToken = await hre.ethers.getContractFactory("HOYToken");
  const hoytoken = await HoysalToken.deploy("hoysal","HOY");

  await hoytoken.deployed();

  const data = {
    address: hoytoken.address,
    abi: JSON.parse(hoytoken.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/Contract_det.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
