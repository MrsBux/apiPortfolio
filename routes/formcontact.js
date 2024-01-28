const express = require("express");
const router = express.Router();
const formcontactCtrl = require("../controllers/formcontact.js");
const limiter = require("../middleware/rateLimiter.js");

router.post("/", limiter, formcontactCtrl.getForm);

module.exports = router;
