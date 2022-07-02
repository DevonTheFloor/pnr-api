const mongoose = require('mongoose');

const annonceSchema= mongoose.Schema({
  mdp: {type: String, required: true},
  titre: { type: String, required: false},
  annonce: { type: String, require: false },
  categorie : { type: String, required: true },
  objet : { type: String, required: true },
  marque : { type: String, required: false },
  modele : { type: String, required: false },
  annee : { type: Number, required: false},
  piece: { type: String, required: true },
  region: { type: String, required: true },
  departement: {type: String, required: true },
  urlImg: { type: String},
  date: {type: String, required: false},
  heure: {type: String, required: false},
  email: {type: String},
  tel: {type: Number},
  prix: { type: Number}
});


module.exports= mongoose.model('Annonce',annonceSchema);