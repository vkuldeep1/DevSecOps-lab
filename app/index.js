const express = require("express");
const app = express();
const { spawn } = require('child_process');
const rateLimit = require('express-rate-limit');

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});
app.use(limiter);

// Root route
app.get('/', (req, res) => {
  res.send("Hello DevSecOps");
});

// Secure ping route
app.get('/ping', (req, res) => {
  const host = req.query.host;

  // Strict validation
  if (!host || !/^[a-zA-Z0-9.-]+$/.test(host)) {
    return res.status(400).send("Invalid host");
  }

  const ping = spawn('ping', ['-c', '1', host]);

  let output = '';

  ping.stdout.on('data', (data) => {
    output += data.toString();
  });

  ping.stderr.on('data', (data) => {
    output += data.toString();
  });

  ping.on('close', () => {
    res.send(output);
  });
});

// Start server
app.listen(3000, () => {
  console.log("App running on port 3000");
});
