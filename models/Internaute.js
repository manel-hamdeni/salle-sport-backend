const mongoose = require('mongoose');
const User = require('./User');

const internauteSchema = new mongoose.Schema({
  entreprise: { type: String },
});

const Internaute = User.discriminator('internaute', internauteSchema);
module.exports = Internaute;
