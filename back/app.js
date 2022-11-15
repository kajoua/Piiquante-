// Express : un framework qui facilite la création et la gestion des serveurs Node
// Package.json: les détails de tous les packages npm que nous utiliserons
const express = require("express");
// importation de mongoose
const mongoose = require("mongoose");
// // middleware va intercepter toutes les requêtes faites sur le port HTTP
// //  et va renvoyer avec la réponse « HTTP 301 Moved Permanently » vers l’url en HTTPS
// const express_enforces_ssl = require("express-enforces-ssl");
const helmet = require("helmet");
//  HPP Pas nécessaire ici car =
const hpp = require("hpp");
const session = require("cookie-session");
const xXssProtection = require("x-xss-protection");
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
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
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
  res.setHeader("X-XSS-Protection", "1; mode=block");
  //  Méthode qui permet à chaque middleware de passer l'exécution au middleware suivant
  next();
});
// Sécurisation de cookie
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: "session",
    keys: ["key1", "key2"],
    cookie: {
      secure: true,
      // httpOnly: un booléen indiquant si le cookie doit uniquement être
      //  envoyé via HTTP(S), et non mis à la disposition du client JavaScript
      httpOnly: true,
      path: "/",
      expires: expiryDate,
    },
  })
);
app.disable("x-powered-by");

app.use(hpp());
app.use(express.json());
// app.use(express_enforces_ssl());
// Utilisation du début de la route + routeur qui utilise ce début de route
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(helmet.xssFilter());

app.use(xXssProtection());
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
// Ajout d'une route qui va servir des fichier static; (route pour "image", utilisation du
// middleware static qui est fourni par express (express.static)
// récupération du répertoire dans lequel s'execute notre serveur (path.join())
// et y concaténer le repertoire images
// __dirname est une variable d'environnement qui vous indique le chemin absolu du répertoire contenant le fichier en cours d'exécution
// app.use("/public/images", express.static(path.join(__dirname, "images")));
app.use(express.static("public"));
module.exports = app;
