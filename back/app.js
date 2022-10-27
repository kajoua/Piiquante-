// Express : un framework qui facilite la création et la gestion des serveurs Node
// Package.json: les détails de tous les packages npm que nous utiliserons
const express = require("express");
const bodyParser = require("body-parser");
// importation de mongoose
const mongoose = require("mongoose");
const path = require("path");
// Importation de nos routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//  installation du package dotenv npm install dotenv --save
// importation de dotenv
require("dotenv").config();
// logique connection Api à notre base de données MongoDB

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
const app = express();

app.use(express.json());

// Le CORS permet de prendre en charge des requêtes multi-origines sécurisées
// et des transferts de données entre des navigateurs et des serveurs web
app.use((req, res, next) => {
  // accéder à notre API depuis n'importe quelle origine '*'
  res.setHeader("Access-Control-Allow-Origin", "*");
  //   ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  //   envoyer des requêtes avec les méthodes mentionnées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  //  Méthode qui permet à chaque middleware de passer l'exécution au middleware suivant
  next();
});
app.use(bodyParser.json());
app.use(express.json());
// Utilisation du début de la route + routeur qui utilise ce début de route
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
// Ajout d'une route qui va servir des fichier static; (route pour "image", utilisation du
// middleware static qui est fourni par express (express.static)
// récupération du répertoire dans lequel s'execute notre serveur (path.join())
// et y concaténer le repertoire images
// __dirname est une variable d'environnement qui vous indique le chemin absolu du répertoire contenant le fichier en cours d'exécution
app.use("images", express.static(path.join(__dirname, "images")));
module.exports = app;
