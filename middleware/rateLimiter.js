const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requêtes max par fenêtre
  message: "Trop de soumissions de formulaire, veuillez réessayer plus tard.",
});

module.exports = limiter;
