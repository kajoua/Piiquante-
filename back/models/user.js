// Importation de mongoose
const mongoose = require("mongoose");
// module validator de Mongoos
const validator = require("validator");
// installation package : npm install mongoose-unique-validator pour avoir un user unique
// Rajout du validateur comme plugin au shéma
const uniqueValidator = require("mongoose-unique-validator");
// Création de notre shéma avec la fonction shéma de mongoose
const userSchema = mongoose.Schema({
  // unique: true => eviter que les utilisateurs s'enregistre plusieurs fois avec le même email (mais error avec mongoDB)
  email: {
    type: String,
    validate(mail) {
      if (!validator.isEmail(mail)) throw new Error("E-mail non valide");
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//  Application du validateur au shéma avec la méthode plugin() avant d'en faire un modèle
// uniqueValidator comme argument à la méthode
userSchema.plugin(uniqueValidator);

// Export du modèl pour pouvoir l'utiliser ("Nom du modèle", Shéma qu'on veut utiliser)
// Méthode model => transforme en modèle utilisable
module.exports = mongoose.model("User", userSchema);
