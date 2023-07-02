
const hre = require("hardhat");

async function main() {
  
  const Coinrade = await hre.ethers.getContractFactory("Coinrade");
  const coinrade = await Coinrade.deploy();

  await coinrade.deployed();

  console.log("Coinrade is deployed to:", coinrade.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
