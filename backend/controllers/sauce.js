const Sauce = require('../models/Sauce');

// Création des sauces.
exports.createSauce = (req,res,next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré.'}))
    .catch(error => res.status(400).json({ error }));
};

// Modifications des sauces.
exports.modifySauce = (req,res,next) => {
    Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce modifié.'}))
    .catch(error => res.status(400).json({ error }));
};

// Suppression des sauces.
exports.deleteSauce = (req,res,next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé.'}))
    .catch(error => res.status(400).json({ error }))
}

// Renvoi la sauce avec l'ID.
exports.findSauceById = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

// Renvoi tableau de sauces.
exports.findAllSauce = (req,res,next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}
