const hre = require("hardhat");

async function main() {
  console.log("Deploying ROCA Analytics Test contracts to local testbed...");

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  // Deploy Token
  const Token = await hre.ethers.getContractFactory("AnalyticsTestToken");
  const token = await Token.deploy(1000000); // 1,000,000 initial supply
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log(`AnalyticsTestToken deployed to: ${tokenAddress}`);

  // Deploy BatchTransactor
  const BatchTransactor = await hre.ethers.getContractFactory("BatchTransactor");
  const batchTransactor = await BatchTransactor.deploy();
  await batchTransactor.waitForDeployment();
  const batchAddress = await batchTransactor.getAddress();
  console.log(`BatchTransactor deployed to: ${batchAddress}`);

  console.log("Deployment complete! Contracts ready for Web3.py ingestion.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
