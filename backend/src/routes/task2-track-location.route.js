const express = require("express");
const { getContract } = require("../blockchain");
const { toPlain } = require("../utils/formatters");

const router = express.Router();

router.post("/update-location", async (req, res) => {
  try {
    const { productId, location } = req.body;

    if (!productId || !location) {
      return res.status(400).json({
        error: "productId va location majburiy."
      });
    }

    const contract = getContract();
    const tx = await contract.updateLocation(productId, location);
    await tx.wait();

    req.io.emit("location:update", {
      productId,
      location,
      txHash: tx.hash,
      updatedAt: new Date().toISOString()
    });

    return res.json({
      message: "Lokatsiya yangilandi va real-time kanalga yuborildi.",
      txHash: tx.hash
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

router.get("/:productId/location-history", async (req, res) => {
  try {
    const { productId } = req.params;
    const contract = getContract();
    const history = await contract.getLocationHistory(productId);

    return res.json({
      productId,
      history: toPlain(history)
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;

