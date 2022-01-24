// Importation express.
const express = require('express');
// Body parser.
const bodyParser = require('body-parser');
// Importation mongoose.
const mongoose = require('mongoose');
// Importation helmet.
const helmet = require('helmet');
// DOTENV pour gérer les variables d'environnements.
require('dotenv').config();
// Importation router.
const sauceRoutes = require('./routes/sauce');
// Importation router user.
const userRoutes = require('./routes/user')
// Accès au chemin du système de fichier.
const path = require('path');


// Connexion à la base de données.
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y4e8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'
));

// Appel de express et de helmet.
const app = express();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Exportation du fichier APP.JS.
module.exports = app;
