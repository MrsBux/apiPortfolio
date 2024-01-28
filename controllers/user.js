const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const jwtSecret = process.env.SECRET_KEY || "DefaultSecretKey";

exports.login = (req, res, next) => {
  console.log("Email extrait de la requête :", req.body.email);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "User non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "mot de passe incorrecte" });
          } else {
            const token = jwt.sign({}, jwtSecret, {
              expiresIn: "6h",
            });

            res.status(200).json({
              token: token,
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
