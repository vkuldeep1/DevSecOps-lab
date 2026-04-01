const express = require("express");
const app = express();
const { spawn } = require('child_process');

app.get('/', (req, res) => {
  res.send("Hello DevSecOps");
});

// Vulnerability: command injection risk
app.get('/ping', (req, res) => {
    const host = req.query.host;

    // Basic validation (strict)
    if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
        return res.status(400).send("Invalid host");
    }

    const ping = spawn('ping', ['-c', '1', host]);

    let output = '';

    ping.stdout.on('data', (data) => {
        output += data.toString();
    });


app.listen(3000, () => {
  console.log("App running on port 3000");
});

