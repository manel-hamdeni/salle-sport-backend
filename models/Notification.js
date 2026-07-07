const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['abonnement_expire', 'nouveau_planning', 'message', 'confirmation', 'general'],
      required: true,
    },
    contenu: { type: String, required: true },
    codeConfirmation: { type: String },
    lu: { type: Boolean, default: false },
    destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
