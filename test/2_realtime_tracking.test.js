const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 2 - Mahsulot qayerdaligini real vaqtda kuzatish", function () {
  it("lokatsiyani yangilaydi va tarixda saqlaydi", async function () {
    const [manufacturer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-003", "Dori", "ipfs://metadata/prd-003");

    const tx = await contract
      .connect(manufacturer)
      .updateLocation("PRD-003", "Toshkent logistika markazi");
    await tx.wait();

    const history = await contract.getLocationHistory("PRD-003");
    expect(history.length).to.equal(1);
    expect(history[0].location).to.equal("Toshkent logistika markazi");
    expect(history[0].updatedBy).to.equal(manufacturer.address);
  });

  it("mahsulot egasi bo'lmagan user lokatsiyani yangilay olmaydi", async function () {
    const [manufacturer, outsider] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-004", "Tabletka", "ipfs://metadata/prd-004");

    await expect(
      contract.connect(outsider).updateLocation("PRD-004", "Andijon")
    ).to.be.revertedWith("Only current owner can perform this action");
  });
});

