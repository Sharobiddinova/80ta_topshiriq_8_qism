function toPlain(value) {
  if (typeof value === "bigint") {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map((item) => toPlain(item));
  }

  if (value && typeof value === "object") {
    const output = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      if (/^\d+$/.test(key)) {
        continue;
      }
      output[key] = toPlain(nestedValue);
    }

    return output;
  }

  return value;
}

module.exports = {
  toPlain
};

