const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.js");
const loginLimiter = require("../middleware/loginLimiter.js");

router.post("/login", loginLimiter, userCtrl.login);

module.exports = router;
