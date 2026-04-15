const express = require("express");
const { getContract } = require("../blockchain");
const { toPlain } = require("../utils/formatters");
const { parseStatus, STATUS_LABEL } = require("../utils/status");

const router = express.Router();

router.post("/update-delivery-status", async (req, res) => {
  try {
    const { productId, status, note } = req.body;

    if (!productId || status === undefined) {
      return res.status(400).json({
        error: "productId va status majburiy."
      });
    }

    const parsedStatus = parseStatus(status);
    if (parsedStatus === null) {
      return res.status(400).json({
        error: "Status noto'g'ri. Masalan: InTransit yoki 1."
      });
    }

    const contract = getContract();
    const tx = await contract.updateDeliveryStatus(productId, parsedStatus, note || "");
    await tx.wait();

    req.io.emit("status:update", {
      productId,
      statusCode: parsedStatus,
      statusLabel: STATUS_LABEL[parsedStatus],
      note: note || "",
      txHash: tx.hash
    });

    return res.json({
      message: "Yetkazib berish holati yangilandi.",
      txHash: tx.hash,
      status: STATUS_LABEL[parsedStatus]
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

router.get("/:productId/status-history", async (req, res) => {
  try {
    const { productId } = req.params;
    const contract = getContract();
    const history = await contract.getStatusHistory(productId);
    const plain = toPlain(history).map((item) => ({
      ...item,
      statusLabel: STATUS_LABEL[Number(item.status)]
    }));

    return res.json({
      productId,
      history: plain
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;

