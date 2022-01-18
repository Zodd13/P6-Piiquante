const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce')

// Renvoi tableau de sauces.
router.get('/' , auth, sauceCtrl.findAllSauce);

// Création des sauces.
router.post('/', auth, multer, sauceCtrl.createSauce);

// Renvoi la sauce avec l'ID.
router.get('/:id', auth, sauceCtrl.findSauceById);

// Modifications des sauces.
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Suppression des sauces.
router.delete('/:id', auth, sauceCtrl.deleteSauce);



module.exports = router;