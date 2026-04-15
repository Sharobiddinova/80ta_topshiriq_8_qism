const express = require("express");
const { getContract } = require("../blockchain");
const { toPlain } = require("../utils/formatters");

const router = express.Router();

router.post("/register-product", async (req, res) => {
  try {
    const { productId, name, metadataURI } = req.body;

    if (!productId || !name) {
      return res.status(400).json({
        error: "productId va name majburiy maydonlar."
      });
    }

    const contract = getContract();
    const tx = await contract.registerProduct(productId, name, metadataURI || "");
    await tx.wait();

    const product = await contract.getProduct(productId);

    return res.status(201).json({
      message: "Mahsulot blockchain tizimiga kiritildi.",
      txHash: tx.hash,
      product: toPlain(product)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;

