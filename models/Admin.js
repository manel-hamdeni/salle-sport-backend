const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  permissions: {
    type: [String],
    default: ['gerer_users', 'gerer_coachs', 'gerer_planning', 'voir_stats'],
  },
});

const Admin = User.discriminator('admin', adminSchema);
module.exports = Admin;
