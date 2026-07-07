const User = require('../models/User');
const Admin = require('../models/Admin');
const Coach = require('../models/Coach');
const Client = require('../models/Client');

// @desc    Obtenir tous les utilisateurs
// @route   GET /api/users
// @access  Admin
const getTousUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 10 } = req.query;
    const filtre = role ? { role } : {};

    const users = await User.find(filtre)
      .select('-motDePasse')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filtre);

    res.json({
      success: true,
      total,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir un utilisateur par ID
// @route   GET /api/users/:id
// @access  Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-motDePasse');
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Modifier un utilisateur
// @route   PUT /api/users/:id
// @access  Admin ou utilisateur lui-même
const modifierUser = async (req, res) => {
  try {
    const { nom, prenom, email, specialite, abonnement, disponibilite } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });

    // Vérifier autorisation (admin ou soi-même)
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: 'Accès refusé.' });
    }

    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom;
    user.email = email || user.email;

    if (user.role === 'coach') {
      user.specialite = specialite || user.specialite;
      user.disponibilite = disponibilite !== undefined ? disponibilite : user.disponibilite;
    }
    if (user.role === 'client') {
      user.abonnement = abonnement || user.abonnement;
    }

    await user.save();
    res.json({ success: true, message: 'Utilisateur modifié.', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Supprimer un utilisateur
// @route   DELETE /api/users/:id
// @access  Admin
const supprimerUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur introuvable.' });

    await user.deleteOne();
    res.json({ success: true, message: 'Utilisateur supprimé.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir tous les coachs disponibles
// @route   GET /api/users/coachs/disponibles
// @access  Public
const getCoachsDisponibles = async (req, res) => {
  try {
    const coachs = await Coach.find({ disponibilite: true }).select('-motDePasse');
    res.json({ success: true, coachs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Statistiques pour l'admin
// @route   GET /api/users/stats
// @access  Admin
const getStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalCoachs = await User.countDocuments({ role: 'coach' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const coachsDisponibles = await User.countDocuments({ role: 'coach', disponibilite: true });

    res.json({
      success: true,
      stats: { totalClients, totalCoachs, totalAdmins, coachsDisponibles },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTousUsers, getUserById, modifierUser, supprimerUser, getCoachsDisponibles, getStats };
