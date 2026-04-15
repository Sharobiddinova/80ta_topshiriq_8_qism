const express = require("express");
const { getContract } = require("../blockchain");
const { toPlain } = require("../utils/formatters");

const router = express.Router();

router.post("/transfer-ownership", async (req, res) => {
  try {
    const { productId, newOwner, note } = req.body;

    if (!productId || !newOwner) {
      return res.status(400).json({
        error: "productId va newOwner majburiy."
      });
    }

    const contract = getContract();
    const tx = await contract.transferProductOwnership(productId, newOwner, note || "");
    await tx.wait();

    req.io.emit("ownership:transferred", {
      productId,
      newOwner,
      note: note || "",
      txHash: tx.hash
    });

    const product = await contract.getProduct(productId);

    return res.json({
      message: "Mahsulot egasi yangilandi.",
      txHash: tx.hash,
      currentOwner: product.currentOwner
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

router.get("/:productId/ownership-history", async (req, res) => {
  try {
    const { productId } = req.params;
    const contract = getContract();
    const history = await contract.getOwnershipHistory(productId);

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

