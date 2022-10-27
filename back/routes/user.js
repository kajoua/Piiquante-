//  utilisation de express afin de créer un router
const express = require("express");

// fonction router de express
const router = express.Router();

// controler pour associer les fonctions aux diff routes
const userCtrl = require("../controllers/user");

// Routes POST car le front envoie des infos ( email et mdp)
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
