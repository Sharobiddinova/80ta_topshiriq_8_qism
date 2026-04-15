const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 3 - Yetkazib berish holatini yangilash", function () {
  it("delivery holatini InTransit ga o'tkazadi", async function () {
    const [manufacturer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-005", "Shakar", "ipfs://metadata/prd-005");

    await contract
      .connect(manufacturer)
      .updateDeliveryStatus("PRD-005", 1, "Mashina yo'lga chiqdi");

    const product = await contract.getProduct("PRD-005");
    const statusHistory = await contract.getStatusHistory("PRD-005");

    expect(product.status).to.equal(1);
    expect(statusHistory.length).to.equal(2);
    expect(statusHistory[1].note).to.equal("Mashina yo'lga chiqdi");
  });
});

