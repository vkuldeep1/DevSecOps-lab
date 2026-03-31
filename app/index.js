const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send("Hello DevSecOps");
});

// Vulnerability: command injection risk
app.get('/ping', (req, res) => {
  const { exec } = require('child_process');
  const host = req.query.host;

  exec(`ping -c 1 ${host}`, (err, stdout) => {
    res.send(stdout);
  });
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});

