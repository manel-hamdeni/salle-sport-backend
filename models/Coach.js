const mongoose = require('mongoose');
const User = require('./User');

const coachSchema = new mongoose.Schema({
  specialite: { type: String, trim: true },
  disponibilite: { type: Boolean, default: true },
  bio: { type: String },
  photo: { type: String },
});

const Coach = User.discriminator('coach', coachSchema);
module.exports = Coach;
