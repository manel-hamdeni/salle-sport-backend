const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    description: { type: String },
    typeSeance: {
      type: String,
      enum: ['collectif', 'individuel'],
      required: true,
    },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    capaciteMax: { type: Number, default: 20 },
    status: {
      type: String,
      enum: ['planifie', 'en_cours', 'termine', 'annule'],
      default: 'planifie',
    },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Planning', planningSchema);
