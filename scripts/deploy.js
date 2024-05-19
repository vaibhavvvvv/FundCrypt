
const hre = require("hardhat");

//0x5fbdb2315678afecb367f032d93f642f64180aa3
async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.waitForDeployment();

  console.log(  
    `CrowdFunding deployed to`,await crowdFunding.getAddress()
  );
}  

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
