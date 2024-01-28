const express = require("express");
const auth = require("../middleware/auth.js");
const sharp = require("../middleware/sharp.js");
const multer = require("../middleware/multer-cover.js");

const router = express.Router();
const projectsCtrl = require("../controllers/projects.js");

router.post("/", auth, multer, sharp, projectsCtrl.createProject);

router.delete("/:id", auth, projectsCtrl.deleteProject);

router.get("/", projectsCtrl.getAllProject);

module.exports = router;
