const mongoose = require('mongoose');
const User = require('./User');

const clientSchema = new mongoose.Schema({
  abonnement: {
    type: String,
    enum: ['mensuel', 'trimestriel', 'annuel', 'premium', null],
    default: null,
  },
  dateDebutAbonnement: { type: Date },
  dateFinAbonnement: { type: Date },
  codeConfirmation: { type: String },
  objectifSportif: { type: String },
  telephone: { type: String },
});

const Client = User.discriminator('client', clientSchema);
module.exports = Client;
