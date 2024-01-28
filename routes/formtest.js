const express = require("express");
const router = express.Router();
const formtestCtrl = require("../controllers/formtest.js");
const limiter = require("../middleware/rateLimiter.js");

router.post("/", limiter, formtestCtrl.getFormTest);

module.exports = router;
