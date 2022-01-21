const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

const likeCtrl = require('../controllers/like');

// Renvoi tableau de sauces.
router.get('/' , auth, sauceCtrl.findAllSauce);
// Route like et dislike
router.post('/:id/like', auth, likeCtrl.likeSauce);
// Création des sauces.
router.post('/', auth, multer, sauceCtrl.createSauce);

// Renvoi la sauce avec l'ID.
router.get('/:id', auth, sauceCtrl.findSauceById);

// Modifications des sauces.
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Suppression des sauces.
router.delete('/:id', auth, sauceCtrl.deleteSauce);



module.exports = router;