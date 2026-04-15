const DELIVERY_STATUS = {
  Registered: 0,
  InTransit: 1,
  AtWarehouse: 2,
  OutForDelivery: 3,
  Delivered: 4,
  Cancelled: 5
};

const STATUS_LABEL = Object.entries(DELIVERY_STATUS).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

function parseStatus(statusInput) {
  if (statusInput === undefined || statusInput === null) {
    return null;
  }

  if (typeof statusInput === "number" && STATUS_LABEL[statusInput] !== undefined) {
    return statusInput;
  }

  if (typeof statusInput === "string") {
    if (DELIVERY_STATUS[statusInput] !== undefined) {
      return DELIVERY_STATUS[statusInput];
    }

    const maybeNumber = Number(statusInput);
    if (!Number.isNaN(maybeNumber) && STATUS_LABEL[maybeNumber] !== undefined) {
      return maybeNumber;
    }
  }

  return null;
}

module.exports = {
  DELIVERY_STATUS,
  STATUS_LABEL,
  parseStatus
};

