// MIDDLEWARE auth.js prend le token envoyé par le client, vérifie la validité et permet à nos différentes
// routes d'en exploiter l'utilisation, ici userId
// importation de jsonwebtoken
const jwt = require("jsonwebtoken");

// exportation de la fonction qui sera notre middleware
module.exports = (req, res, next) => {
  // besoin de récupérer le token (qui est en deux partie : bearer et le token)

  //   L'instruction try...catch regroupe des instructions à exécuter et
  //  définit une réponse si l'une de ces instructions provoque une exception
  try {
    // récupération du token dans le header avec split( autour de l'espace entre bearer et le token (" ")) [1] recup du token]
    const token = req.headers.authorization.split(" ")[1];
    // méthode verifiy() de jwt pour decoder le token ( le token , la clé secrète)
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // récupération de l'Id
    const userId = decodedToken.userId;
    // rajout de cette valeur à l'objet request qui lui est transmis aux routes qui vont l'utiliser par la suite
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    // erreur 401 : Non authentifié, token invalide
    res.status(401).json({ error });
  }
};
