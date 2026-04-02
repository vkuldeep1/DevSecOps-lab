const express = require("express");
const app = express();
const { spawn } = require("child_process");
const rateLimit = require("express-rate-limit");

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});
app.use(limiter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello DevSecOps");
});

// Secure ping route
app.get("/ping", (req, res) => {
  const host = req.query.host;

  // Strict validation
  if (!host || !/^[a-zA-Z0-9.-]+$/.test(host)) {
    return res.status(400).send("Invalid host");
  }

  // Block internal/private networks
  if (
    host === "localhost" ||
    host.startsWith("127.") ||
    host.startsWith("10.") ||
    host.startsWith("192.168") ||
    host.startsWith("172.")
  ) {
    return res.status(403).send("Forbidden host");
  }

  const ping = spawn("ping", ["-c", "1", host]);

  let output = "";

  ping.stdout.on("data", (data) => {
    output += data.toString();
  });

  ping.stderr.on("data", (data) => {
    output += data.toString();
  });

  ping.on("close", () => {
    res.send(output);
  });
});

// Start server
app.listen(3000, () => {
  console.log("App running on port 3000");
});
