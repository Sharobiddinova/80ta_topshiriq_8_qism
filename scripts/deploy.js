const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("SupplyChainLogistics");
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  const network = hre.network.name;

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  const deploymentPath = path.join(deploymentsDir, `${network}.json`);

  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  fs.writeFileSync(
    deploymentPath,
    JSON.stringify(
      {
        network,
        contract: "SupplyChainLogistics",
        address,
        deployedAt: new Date().toISOString()
      },
      null,
      2
    )
  );

  console.log(`SupplyChainLogistics deployed to: ${address}`);
  console.log(`Deployment info saved: ${deploymentPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

