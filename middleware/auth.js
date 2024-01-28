const jwt = require("jsonwebtoken");
// Chargement des variables d'environnement depuis un fichier .env
require("dotenv").config();
// Récupération de la clé secrète JWT depuis les variables d'environnement
const jwtSecret = process.env.SECRET_KEY || "DefaultSecretKey";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
