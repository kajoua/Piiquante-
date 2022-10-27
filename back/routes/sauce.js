// Logique de routine
const express = require("express");
// Methode router de Express permettant de mettre la route et le middleware
const router = express.Router();
// Importation du middleware dans notre routeur afin qu'il soit executer avant les gestionnaires de nos routes
const auth = require("../middleware/auth");
// importation du middleware multer, entre auth et la route
const multer = require("../middleware/multer-config");
// importation du controllers sauce
const sauceCtrl = require("../controllers/sauce");
// Si multer est enregistré avant un middleware d'authentification, tout fichier contenu dans une requête, même non authentifiée, sera enregistré sur le système de fichiers. Il est donc essentiel, dans cette situation, d'enregistrer multer après le middleware d'authentification.
// router = permet d'enristrer la route sur le router
// Nom des fonctions sémantique pour une compréhension claire ( pas () car on veut juste lire la fonction)
// "auth" avant nos gestionnaires de route sinon les routes sont appelé en premier sans utiliser auth au préalable
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
