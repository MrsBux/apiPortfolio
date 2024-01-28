const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX_REQUESTS,
  message: "Too many login attempts, please try again later.",
});

module.exports = loginLimiter;
