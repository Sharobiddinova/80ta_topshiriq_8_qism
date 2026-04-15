const express = require("express");
const { getContract } = require("../blockchain");
const { toPlain } = require("../utils/formatters");

const router = express.Router();

router.post("/verify-authenticity", async (req, res) => {
  try {
    const { productId, expectedHash } = req.body;

    if (!productId || !expectedHash) {
      return res.status(400).json({
        error: "productId va expectedHash majburiy."
      });
    }

    const contract = getContract();
    const product = await contract.getProduct(productId);
    const isAuthentic = await contract.checkAuthenticity(productId, expectedHash);

    return res.json({
      productId,
      expectedHash,
      storedHash: product.fingerprint,
      isAuthentic
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

router.get("/:productId/fingerprint", async (req, res) => {
  try {
    const { productId } = req.params;
    const contract = getContract();
    const product = await contract.getProduct(productId);

    return res.json({
      productId,
      product: toPlain(product)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;

