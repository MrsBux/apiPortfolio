const http = require("http");
const https = require("https");
const fs = require("fs");
const app = require("./app.js");
require("dotenv").config();

// ...

const privateKey = fs.readFileSync("./cert/private.key", "utf8");
const certificate = fs.readFileSync("./cert/certificate.crt", "utf8");
const ca = fs.readFileSync("./cert/ca_bundle.crt", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => {
  console.log("HTTP Server running on port 3000");
});

httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
