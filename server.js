const http = require("http");
const https = require("https");
const fs = require("fs");
const app = require("./app.js");
require("dotenv").config();

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const privateKey = fs.readFileSync("./cert/private.key", "utf8");
const certificate = fs.readFileSync("./cert/certificate.crt", "utf8");
const ca = fs.readFileSync("./cert/ca_bundle.crt", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => {
  console.log("HTTP Server running on port " + port);
});

httpsServer.listen(process.env.PORT || 443, "0.0.0.0", () => {
  console.log("HTTPS Server running on port " + (process.env.PORT || 443));
});
