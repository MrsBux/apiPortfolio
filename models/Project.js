const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: { type: String, required: true },
  descriptionCourte: { type: String, required: true },
  descriptionLongue: { type: String, required: true },
  langages: { type: String, required: true },

  categories: { type: String, required: true },
  date: { type: Date, required: true },
  duree: { type: Number, required: true },
  lienProjet: { type: String, required: false },
  lienRepoGit: { type: String, required: true },

  coverURL: { type: String, required: true },

  images: [
    {
      src: { type: String, required: false },
      alt: { type: String, required: false },
      caption: { type: String, required: false },
    },
  ],

  userId: { type: String, required: false },
});

module.exports = mongoose.model("Project", projectSchema);
