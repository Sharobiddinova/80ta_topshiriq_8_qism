let socket = null;

function getBackendUrl() {
  return document.getElementById("backendUrl").value.trim().replace(/\/$/, "");
}

function setResult(id, data) {
  const el = document.getElementById(id);
  el.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

async function apiRequest(path, method = "GET", body = null) {
  const backendUrl = getBackendUrl();
  const response = await fetch(`${backendUrl}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "So'rovda xatolik");
  }

  return result;
}

function connectSocket() {
  const backendUrl = getBackendUrl();

  if (socket) {
    socket.disconnect();
  }

  socket = window.io(backendUrl, { transports: ["websocket"] });

  socket.on("connect", () => {
    setResult("socketStatus", `Socket holati: ulandi (${socket.id})`);
  });

  socket.on("disconnect", () => {
    setResult("socketStatus", "Socket holati: uzildi");
  });

  socket.on("location:update", (payload) => {
    const list = document.getElementById("realtimeFeed");
    const item = document.createElement("li");
    item.textContent = `${payload.productId} -> ${payload.location} (${payload.updatedAt})`;
    list.prepend(item);
  });
}

document.getElementById("connectSocketBtn").addEventListener("click", connectSocket);

document.getElementById("task1Form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const result = await apiRequest("/api/task1/register-product", "POST", {
      productId: formData.get("productId"),
      name: formData.get("name"),
      metadataURI: formData.get("metadataURI")
    });
    setResult("task1Result", result);
  } catch (error) {
    setResult("task1Result", error.message);
  }
});

document.getElementById("task2Form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const result = await apiRequest("/api/task2/update-location", "POST", {
      productId: formData.get("productId"),
      location: formData.get("location")
    });
    setResult("task2Result", result);
  } catch (error) {
    setResult("task2Result", error.message);
  }
});

document.getElementById("task2HistoryBtn").addEventListener("click", async () => {
  try {
    const productId = document.getElementById("task2HistoryProductId").value.trim();
    const result = await apiRequest(`/api/task2/${productId}/location-history`);
    setResult("task2Result", result);
  } catch (error) {
    setResult("task2Result", error.message);
  }
});

document.getElementById("task3Form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const result = await apiRequest("/api/task3/update-delivery-status", "POST", {
      productId: formData.get("productId"),
      status: formData.get("status"),
      note: formData.get("note")
    });
    setResult("task3Result", result);
  } catch (error) {
    setResult("task3Result", error.message);
  }
});

document.getElementById("task3HistoryBtn").addEventListener("click", async () => {
  try {
    const productId = document.getElementById("task3HistoryProductId").value.trim();
    const result = await apiRequest(`/api/task3/${productId}/status-history`);
    setResult("task3Result", result);
  } catch (error) {
    setResult("task3Result", error.message);
  }
});

document.getElementById("task4Form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const result = await apiRequest("/api/task4/verify-authenticity", "POST", {
      productId: formData.get("productId"),
      expectedHash: formData.get("expectedHash")
    });
    setResult("task4Result", result);
  } catch (error) {
    setResult("task4Result", error.message);
  }
});

document.getElementById("task4FingerprintBtn").addEventListener("click", async () => {
  try {
    const productId = document.getElementById("task4FingerprintProductId").value.trim();
    const result = await apiRequest(`/api/task4/${productId}/fingerprint`);
    setResult("task4Result", result);
  } catch (error) {
    setResult("task4Result", error.message);
  }
});

document.getElementById("task5Form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  try {
    const result = await apiRequest("/api/task5/transfer-ownership", "POST", {
      productId: formData.get("productId"),
      newOwner: formData.get("newOwner"),
      note: formData.get("note")
    });
    setResult("task5Result", result);
  } catch (error) {
    setResult("task5Result", error.message);
  }
});

document.getElementById("task5HistoryBtn").addEventListener("click", async () => {
  try {
    const productId = document.getElementById("task5HistoryProductId").value.trim();
    const result = await apiRequest(`/api/task5/${productId}/ownership-history`);
    setResult("task5Result", result);
  } catch (error) {
    setResult("task5Result", error.message);
  }
});

document.getElementById("task6AuditBtn").addEventListener("click", async () => {
  try {
    const productId = document.getElementById("task6ProductId").value.trim();
    const result = await apiRequest(`/api/task6/${productId}/audit`);
    setResult("task6Result", result);
  } catch (error) {
    setResult("task6Result", error.message);
  }
});

