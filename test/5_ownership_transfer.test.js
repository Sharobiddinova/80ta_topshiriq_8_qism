const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 5 - Mahsulot egasini o'zgartirish", function () {
  it("ishlab chiqaruvchi -> distribyutor -> sotuvchi zanjirini yaratadi", async function () {
    const [manufacturer, distributor, retailer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-008", "Suv", "ipfs://metadata/prd-008");

    await contract
      .connect(manufacturer)
      .transferProductOwnership("PRD-008", distributor.address, "Distribyutorga berildi");

    await contract
      .connect(distributor)
      .transferProductOwnership("PRD-008", retailer.address, "Sotuvchiga topshirildi");

    const product = await contract.getProduct("PRD-008");
    const ownershipHistory = await contract.getOwnershipHistory("PRD-008");

    expect(product.currentOwner).to.equal(retailer.address);
    expect(ownershipHistory.length).to.equal(3);
    expect(ownershipHistory[1].to).to.equal(distributor.address);
    expect(ownershipHistory[2].to).to.equal(retailer.address);
  });
});

