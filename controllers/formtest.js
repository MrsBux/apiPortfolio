const FormTest = require("../models/FormTest");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EmailUser = process.env.EMAIL_USER;
const EmailPassword = process.env.EMAIL_PASSWORD;
const EmailBux = process.env.EMAIL_BUX;

const getFormTest = async (req, res) => {
  try {
    const nouveauFormulaireTest = new FormTest({
      url: req.body.url,
      email: req.body.email,
    });
    await nouveauFormulaireTest.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EmailUser,
        pass: EmailPassword,
      },
    });

    const mailOptions = {
      from: EmailUser,
      to: EmailBux,
      subject: "Nouveau formulaire TEST soumis",
      text:
        "Un nouveau formulaire de test a été soumis sur votre site.\n" +
        `url: ${req.body.prenom}\n` +
        `E-mail: ${req.body.email}\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail : ", error);
      } else {
        console.log("E-mail envoyé : ", info.response);
      }
    });

    res.status(200).send("Formulaire soumis avec succès !");
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire : ", error);
    res.status(500).send("Erreur lors du traitement du formulaire.");
  }
};

module.exports = {
  getFormTest,
};
