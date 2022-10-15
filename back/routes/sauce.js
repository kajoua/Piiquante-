const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");
// Si multer est enregistré avant un middleware d'authentification, tout fichier contenu dans une requête, même non authentifiée, sera enregistré sur le système de fichiers. Il est donc essentiel, dans cette situation, d'enregistrer multer après le middleware d'authentification.
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.post("/", auth, multer, sauceCtrl.createSauce);

router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;