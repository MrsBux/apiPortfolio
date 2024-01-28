const multer = require("multer");

// Types MIME acceptés et leurs extensions correspondantes
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Configuration du stockage des fichiers avec Multer

const storage = multer.diskStorage({
  // Destination des fichiers téléchargés
  destination: (req, file, callback) => {
    console.log("Destination du fichier :");
    console.log("file:", file);
    callback(null, "images");
  },

  // Gestion du nom de fichier
  filename: (req, file, callback) => {
    console.log("Nom du fichier :");
    console.log("file:", file);

    // Remplacement des espaces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    // Récupération de l'extension correspondant au type MIME du fichier
    const extension = MIME_TYPES[file.mimetype];
    // Création d'un nom de fichier unique en ajoutant un timestamp
    callback(null, name + Date.now() + "." + extension);
  },
});

// Multer configuré pour gérer les téléchargements de fichiers
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    console.log("Filtrage du fichier :");
    console.log("file:", file);

    // Vérification du type MIME du fichier
    const isValid = !!MIME_TYPES[file.mimetype];
    // Appel du callback avec une erreur si le type MIME n'est pas valide
    callback(null, isValid);
  },
}).fields([{ name: "coverURL" }, { name: "images", maxCount: 5 }]);
