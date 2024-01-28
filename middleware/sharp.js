const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = (req, res, next) => {
  console.log("Middleware reached");
  if (req.file) {
    // Traitement de la nouvelle image
    const filename =
      req.file.filename.split(".")[0] + "_" + Date.now() + ".webp";

    // Utilisation de Sharp pour redimensionner et convertir l'image en format WebP
    sharp(req.file.path)
      .resize(600) // Redimensionnage de l'image à une largeur de 600 pixels
      .toFormat("webp", { quality: 80 }) // Conversion de l'image en format WebP
      .toFile(path.join("images", filename), (sharpErr, info) => {
        if (sharpErr) {
          return res.status(400).json({ error: sharpErr.message });
        }
        // mise à jour du nom du fichier
        req.file.filename = filename;
        console.log(filename);
        next();
      });
  } else {
    // Si aucune nouvelle image n'est fournie, continuer vers le prochain middleware
    next();
  }
};
