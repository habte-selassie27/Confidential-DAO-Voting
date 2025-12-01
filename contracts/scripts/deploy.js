const hre = require("hardhat");

async function main() {
  console.log("Deploying ProposalManager...");
  const ProposalManager = await hre.ethers.getContractFactory("ProposalManager");
  const proposalManager = await ProposalManager.deploy();
  await proposalManager.waitForDeployment();
  console.log("ProposalManager deployed at:", proposalManager.target);

  console.log("Deploying ConfidentialVoting...");
  const ConfidentialVoting = await hre.ethers.getContractFactory("ConfidentialVoting");
  const confidentialVoting = await ConfidentialVoting.deploy();
  await confidentialVoting.waitForDeployment();
  console.log("ConfidentialVoting deployed at:", confidentialVoting.target);

  // TallyEncryption
  console.log("Deploying TallyEncryption...");
  const TE = await hre.ethers.getContractFactory("TallyEncryption");
  const te = await TE.deploy();
  //await te.deployed();
  console.log("TallyEncryption deployed at:", te.target);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
