const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    adresse: { type: String, required: true },
    localisation: { type: String },
    telephone: { type: String },
    email: { type: String },
    capaciteTotale: { type: Number, default: 100 },
    horaires: {
      lundi: { ouverture: String, fermeture: String },
      mardi: { ouverture: String, fermeture: String },
      mercredi: { ouverture: String, fermeture: String },
      jeudi: { ouverture: String, fermeture: String },
      vendredi: { ouverture: String, fermeture: String },
      samedi: { ouverture: String, fermeture: String },
      dimanche: { ouverture: String, fermeture: String },
    },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Salle', salleSchema);
