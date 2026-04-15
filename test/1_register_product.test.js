const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 1 - Mahsulotni tizimga birinchi marta kiritish", function () {
  it("yangi mahsulotni blockchain ga ro'yxatdan o'tkazadi", async function () {
    const [manufacturer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    const tx = await contract
      .connect(manufacturer)
      .registerProduct("PRD-001", "Olma Sharbat", "ipfs://metadata/prd-001");
    await tx.wait();

    const product = await contract.getProduct("PRD-001");
    expect(product.productId).to.equal("PRD-001");
    expect(product.name).to.equal("Olma Sharbat");
    expect(product.currentOwner).to.equal(manufacturer.address);
    expect(product.exists).to.equal(true);
  });

  it("bir xil productId bilan qayta kiritishni bloklaydi", async function () {
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract.registerProduct("PRD-002", "Yog'", "ipfs://metadata/prd-002");
    await expect(
      contract.registerProduct("PRD-002", "Yog' 2", "ipfs://metadata/prd-002-v2")
    ).to.be.revertedWith("Product already exists");
  });
});

