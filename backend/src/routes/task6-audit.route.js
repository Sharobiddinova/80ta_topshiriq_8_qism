const express = require("express");
const { getContract } = require("../blockchain");
const { toPlain } = require("../utils/formatters");
const { STATUS_LABEL } = require("../utils/status");

const router = express.Router();

router.get("/:productId/audit", async (req, res) => {
  try {
    const { productId } = req.params;
    const contract = getContract();

    const [product, locations, ownerships, statuses] =
      await contract.auditSupplyChain(productId);

    const plainStatuses = toPlain(statuses).map((item) => ({
      ...item,
      statusLabel: STATUS_LABEL[Number(item.status)]
    }));

    return res.json({
      product: toPlain(product),
      locations: toPlain(locations),
      ownerships: toPlain(ownerships),
      statuses: plainStatuses,
      auditSummary: {
        totalLocations: locations.length,
        totalOwnershipTransfers: ownerships.length,
        totalStatusUpdates: statuses.length
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;

