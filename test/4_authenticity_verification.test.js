const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 4 - Mahsulot haqiqiyligini tekshirish", function () {
  it("to'g'ri hash bilan mahsulotni haqiqiy deb tasdiqlaydi", async function () {
    const [manufacturer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-006", "Qahva", "ipfs://metadata/prd-006");

    const product = await contract.getProduct("PRD-006");
    const isAuthentic = await contract.checkAuthenticity(
      "PRD-006",
      product.fingerprint
    );

    expect(isAuthentic).to.equal(true);
  });

  it("noto'g'ri hash bilan mahsulotni soxta deb qaytaradi", async function () {
    const [manufacturer] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-007", "Un", "ipfs://metadata/prd-007");

    const fakeHash = ethers.keccak256(ethers.toUtf8Bytes("fake-product"));
    const isAuthentic = await contract.checkAuthenticity("PRD-007", fakeHash);

    expect(isAuthentic).to.equal(false);
  });
});

