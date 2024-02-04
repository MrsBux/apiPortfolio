const Actu = require("../models/Actu");

//test

exports.createActu = (req, res, next) => {
  delete req.body._id;
  const actu = new Actu({
    ...req.body,
  });
  actu
    .save()
    .then(() => res.status(201).json({ message: "Actu enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyActu = (req, res, next) => {
  Actu.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Actu modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteActu = (req, res, next) => {
  Actu.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Actu supprimée !" })) // test
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneActu = (req, res, next) => {
  Actu.findOne({ _id: req.params.id })
    .then((actu) => res.status(200).json(actu))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllActu = (req, res, next) => {
  Actu.find()
    .then((actus) => res.status(200).json(actus))
    .catch((error) => res.status(400).json({ error }));
};
