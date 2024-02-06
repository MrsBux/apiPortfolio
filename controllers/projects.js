const Project = require("../models/Project");
const fs = require("fs");

exports.createProject = (req, res, next) => {
  console.log("req.body:", req.body);
  const projectObject = req.body;
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  const coverURL = req.files.coverURL
    ? `https://${req.get("host")}/images/${req.files.coverURL[0].filename}`
    : null;

  console.log("cover", coverURL);

  // Récupérez les fichiers téléchargés depuis req.files.images
  const imagesR = req.files.images;
  const images =
    imagesR && Array.isArray(imagesR)
      ? imagesR.map((file) => ({
          src: `https://${req.get("host")}/images/${file.filename}`,
          alt: file.originalname,
          caption: file.originalname,
        }))
      : [];

  console.log("images", images);

  const project = new Project({
    ...projectObject,
    coverURL: coverURL,
    images: images,
  });

  project
    .save()
    .then(() => {
      res.status(201).json({ message: "Projet enregistré !" });
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'enregistrement du projet :",
        error.message
      );
      res.status(500).json({ error: "Erreur interne du serveur" });
    });
};

// exports.deleteProject = (req, res, next) => {
//   Project.findOne({ _id: req.params.id })
//     .then((project) => {
//       // Suppression des images
//       project.images.forEach((image) => {
//         const imageFilename = image.url.split("/images/")[1];
//         fs.unlink(`images/${imageFilename}`, (err) => {
//           if (err) {
//             console.error(err);
//           }
//         });
//       });

//

//       // Suppression du projet
//       Project.deleteOne({ _id: req.params.id })
//         .then(() => {
//           res.status(200).json({ message: "Projet supprimé !" });
//         })
//         .catch((error) => res.status(401).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

exports.deleteProject = (req, res, next) => {
  Project.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Projet supprimé !" });
    })
    .catch((error) => res.status(401).json({ error }));
};

exports.getAllProject = (req, res, next) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
};
