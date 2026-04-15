const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const task1Route = require("./routes/task1-register-product.route");
const task2Route = require("./routes/task2-track-location.route");
const task3Route = require("./routes/task3-update-delivery-status.route");
const task4Route = require("./routes/task4-verify-authenticity.route");
const task5Route = require("./routes/task5-transfer-ownership.route");
const task6Route = require("./routes/task6-audit.route");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  req.io = io;
  next();
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "logistics-backend", time: new Date().toISOString() });
});

app.use("/api/task1", task1Route);
app.use("/api/task2", task2Route);
app.use("/api/task3", task3Route);
app.use("/api/task4", task4Route);
app.use("/api/task5", task5Route);
app.use("/api/task6", task6Route);

io.on("connection", (socket) => {
  socket.emit("server:welcome", {
    message: "Real-time channel connected",
    connectedAt: new Date().toISOString()
  });
});

const port = Number(process.env.BACKEND_PORT || 4000);
server.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});

