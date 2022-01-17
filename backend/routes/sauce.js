const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce')

// Création des sauces.
router.post('/', sauceCtrl.createSauce);

// Modifications des sauces.
router.put('/:id', sauceCtrl.modifySauce);

// Suppression des sauces.
router.delete('/:id', sauceCtrl.deleteSauce);

// Renvoi la sauce avec l'ID.
router.get('/:id', sauceCtrl.findSauceById);

// Renvoi tableau de sauces.
router.get('/' + '', sauceCtrl.findAllSauce);

module.exports = router;