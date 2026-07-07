const Salle = require('../models/Salle');

// @desc    Créer la salle
// @route   POST /api/salle
// @access  Admin
const creerSalle = async (req, res) => {
  try {
    const salle = await Salle.create({ ...req.body, admin: req.user.id });
    res.status(201).json({ success: true, salle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir infos de la salle
// @route   GET /api/salle
// @access  Public
const getSalle = async (req, res) => {
  try {
    const salle = await Salle.findOne().populate('admin', 'nom prenom');
    res.json({ success: true, salle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Modifier la salle
// @route   PUT /api/salle/:id
// @access  Admin
const modifierSalle = async (req, res) => {
  try {
    const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salle) return res.status(404).json({ success: false, message: 'Salle introuvable.' });
    res.json({ success: true, salle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { creerSalle, getSalle, modifierSalle };
