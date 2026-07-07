const Planning = require('../models/Planning');
const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Créer un planning
// @route   POST /api/planning
// @access  Admin
const creerPlanning = async (req, res) => {
  try {
    const { titre, description, typeSeance, dateDebut, dateFin, capaciteMax, coach, salle } = req.body;

    const planning = await Planning.create({
      titre, description, typeSeance, dateDebut, dateFin,
      capaciteMax, coach, salle, admin: req.user.id,
    });

    // Notifier tous les clients
    const clients = await User.find({ role: 'client' });
    const notifications = clients.map((c) => ({
      type: 'nouveau_planning',
      contenu: `Nouveau planning disponible : ${titre} le ${new Date(dateDebut).toLocaleDateString('fr-FR')}`,
      destinataire: c._id,
    }));
    await Notification.insertMany(notifications);

    res.status(201).json({ success: true, message: 'Planning créé.', planning });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir tous les plannings
// @route   GET /api/planning
// @access  Public
const getTousPlanning = async (req, res) => {
  try {
    const { status, typeSeance } = req.query;
    const filtre = {};
    if (status) filtre.status = status;
    if (typeSeance) filtre.typeSeance = typeSeance;

    const plannings = await Planning.find(filtre)
      .populate('coach', 'nom prenom specialite')
      .populate('salle', 'nom adresse')
      .populate('participants', 'nom prenom')
      .sort({ dateDebut: 1 });

    res.json({ success: true, total: plannings.length, plannings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir un planning par ID
// @route   GET /api/planning/:id
// @access  Public
const getPlanningById = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id)
      .populate('coach', 'nom prenom specialite photo')
      .populate('salle', 'nom adresse')
      .populate('participants', 'nom prenom');

    if (!planning) return res.status(404).json({ success: false, message: 'Planning introuvable.' });
    res.json({ success: true, planning });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Modifier un planning
// @route   PUT /api/planning/:id
// @access  Admin
const modifierPlanning = async (req, res) => {
  try {
    const planning = await Planning.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!planning) return res.status(404).json({ success: false, message: 'Planning introuvable.' });
    res.json({ success: true, message: 'Planning modifié.', planning });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Supprimer un planning
// @route   DELETE /api/planning/:id
// @access  Admin
const supprimerPlanning = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    if (!planning) return res.status(404).json({ success: false, message: 'Planning introuvable.' });
    await planning.deleteOne();
    res.json({ success: true, message: 'Planning supprimé.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    S'inscrire à une séance (client)
// @route   POST /api/planning/:id/inscription
// @access  Client
const sInscrireSeance = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    if (!planning) return res.status(404).json({ success: false, message: 'Planning introuvable.' });

    if (planning.participants.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: 'Vous êtes déjà inscrit.' });
    }
    if (planning.participants.length >= planning.capaciteMax) {
      return res.status(400).json({ success: false, message: 'Séance complète.' });
    }

    planning.participants.push(req.user.id);
    await planning.save();

    res.json({ success: true, message: 'Inscription réussie à la séance.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Se désinscrire d'une séance
// @route   DELETE /api/planning/:id/inscription
// @access  Client
const seDesinscrireSeance = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id);
    if (!planning) return res.status(404).json({ success: false, message: 'Planning introuvable.' });

    planning.participants = planning.participants.filter((p) => p.toString() !== req.user.id);
    await planning.save();

    res.json({ success: true, message: 'Désinscription réussie.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { creerPlanning, getTousPlanning, getPlanningById, modifierPlanning, supprimerPlanning, sInscrireSeance, seDesinscrireSeance };
