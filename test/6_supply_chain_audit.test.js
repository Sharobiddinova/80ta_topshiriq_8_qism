const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 6 - Butun ta'minot zanjirini audit qilish", function () {
  it("audit funksiyasi product, lokatsiya, status va ownership tarixini qaytaradi", async function () {
    const [manufacturer, distributor] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SupplyChainLogistics");
    const contract = await Factory.deploy();
    await contract.waitForDeployment();

    await contract
      .connect(manufacturer)
      .registerProduct("PRD-009", "Choy", "ipfs://metadata/prd-009");

    await contract
      .connect(manufacturer)
      .updateLocation("PRD-009", "Namangan ombori");
    await contract
      .connect(manufacturer)
      .updateDeliveryStatus("PRD-009", 1, "Yo'lga chiqdi");
    await contract
      .connect(manufacturer)
      .transferProductOwnership("PRD-009", distributor.address, "Distribyutorga jo'natildi");
    await contract
      .connect(distributor)
      .updateLocation("PRD-009", "Qo'qon distribyutor markazi");
    await contract
      .connect(distributor)
      .updateDeliveryStatus("PRD-009", 4, "Yetkazib berildi");

    const [product, locations, ownerships, statuses] =
      await contract.auditSupplyChain("PRD-009");

    expect(product.productId).to.equal("PRD-009");
    expect(locations.length).to.equal(2);
    expect(ownerships.length).to.equal(2);
    expect(statuses.length).to.equal(3);
    expect(statuses[2].status).to.equal(4);
  });
});

