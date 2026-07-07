const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    contenu: { type: String, required: true },
    expediteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lu: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
