const fs = require("fs");
const path = require("path");

const artifactPath = path.join(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "SupplyChainLogistics.sol",
  "SupplyChainLogistics.json"
);

const outputPaths = [
  path.join(__dirname, "..", "backend", "contractABI.json"),
  path.join(__dirname, "..", "frontend", "contractABI.json")
];

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  if (!fs.existsSync(artifactPath)) {
    throw new Error(
      "Contract artifact not found. Run `npm run compile` first."
    );
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abiOnly = artifact.abi;

  for (const outputPath of outputPaths) {
    ensureDir(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(abiOnly, null, 2));
    console.log(`ABI exported: ${outputPath}`);
  }
}

main();

