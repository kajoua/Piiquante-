// package multer  gérer les fichiers entrants dans les requêtes HTTP = npm install --save multer
// importation de multer
const multer = require("multer");
//  MIME TYPES, création d'un dico qui sera va traduire les extensions
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
//  creation d'un objet de configuration pour multer
// fonction diskStorage() de multer pour enregistrer sur le disk
const storage = multer.diskStorage({
  // objet de configuration que l'on passe à diskStorage on besoin de 2 elements (destination/filename)
  // fontion destination() qui  va expliquer à multer dans quel dossier enregistrer les fichiers,3 arguments (req.file.callback)
  destination: (req, file, callback) => {
    // appelé le callback ( null (= pas eu d'erreur), "images" (=nom du dossier))
    callback(null, "images");
  },
  // fonction  filename() , explique à multer quel nom de fichier à utiliser
  filename: (req, file, callback) => {
    // nom d'origine du fichier (file.originalname) +
    // elimination des espace si présent en les remplacant pas _
    const name = file.originalname.split(" ").join("_");
    // création d'extension, MIME_TYPE pour générer l'extension du fichier
    // l'element du dico qui correspond au mimetype du fichier envoyé au frontend
    const extension = MIME_TYPES[file.mimetype];
    //  Appel du callback ( pas d'erruer = null,const= nom + timestamp + . + const= extension du fichier)
    callback(null, name + Date.now() + "." + extension);
  },
});
//Exportation du middleware multer = .single => fichier unique ("en image uniquement")
module.exports = multer({ storage: storage }).single("image");
