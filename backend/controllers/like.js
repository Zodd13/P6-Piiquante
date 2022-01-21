const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.likeSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((salsa) => {
        // Si userId n'est  pas dans base de donnée et like à 1.
        if(!salsa.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            Sauce.updateOne({ _id: req.params.id },
            {
                $inc: {likes:1},
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
            console.log(false)
        }
    })
    .catch((error) => res.status(404).json({error: error}));
}