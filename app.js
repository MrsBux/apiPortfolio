const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const projectsRoutes = require("./routes/projects");
const actusRoutes = require("./routes/actus");
const userRoutes = require("./routes/user");
const formcontactRoutes = require("./routes/formcontact");
const formtestRoutes = require("./routes/formtest");

require("dotenv").config();
const mongoURI = process.env.MONGODB_URI;
const saltRounds = process.env.SALT_ROUNDS || 10;
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD || "mdp";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connexion à MongoDB réussie !");

    try {
      const adminUserCount = await User.countDocuments({});

      if (adminUserCount === 0) {
        // Hacher le mot de passe avec Bcrypt
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

        const adminUser = new User({
          email: adminEmail,
          password: hashedPassword,
        });

        await adminUser.save();
        console.log("Compte administrateur créé avec succès.");
      } else {
        console.log("Le compte administrateur existe déjà.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification/création du compte administrateur :",
        error.message
      );
    }
  })
  .catch((error) => {
    console.error("Connexion à MongoDB échouée !", error);
  });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/images", express.static("./images"));

app.use("/api/projects", projectsRoutes);

app.use("/api/actus", actusRoutes);

app.use("/api/formcontact", formcontactRoutes);

app.use("/api/formtest", formtestRoutes);

app.use("/api/auth", userRoutes);

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
