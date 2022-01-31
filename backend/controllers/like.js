const Sauce = require('../models/Sauce');

exports.likeSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((salsa) => {
        // Si user ID n'est  pas présent dans le tableau (!includes) et like = 1, incrémente 1 et on ajoute l'userLiked.
        if(!salsa.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            Sauce.updateOne({ _id: req.params.id },
            {
                // Incremente 1 à la BDD sur LIKES
                $inc: {likes:1},
                // PUSH usersLiked à la BDD 
                $push: {usersLiked: req.body.userId}
            }
            )
            .then(() => res.status(200).json({ message: 'Like ajouté.'}))
            .catch();
        }
        if(salsa.usersLiked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne({ _id: req.params.id },
            {
                $inc: {likes:-1},
                $pull: {usersLiked: req.body.userId}
            }
            )
            .then(() => res.status(200).json({ message: 'Like retiré'}))
            .catch();
        }
        if(!salsa.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
            Sauce.updateOne({ _id: req.params.id },
            {
                $inc: {dislikes:1},
                $push: {usersDisliked: req.body.userId}
            }
            )
            .then(() => res.status(201).json({ message: 'Dislike ajouté.'}))
            .catch();
        }
        if(salsa.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne({ _id: req.params.id },
            {
                $inc: {dislikes: -1},
                $pull: {usersDisliked: req.body.userId}
            }
            )
            .then(() => res.status(201).json({ message: 'Dislike retiré.'}))
            .catch();
        }
        else{
            return false;
        }
    })
    .catch((error) => res.status(404).json({error: error}));
}