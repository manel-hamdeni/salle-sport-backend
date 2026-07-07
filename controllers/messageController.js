const Message = require('../models/Message');

// @desc    Envoyer un message
// @route   POST /api/messages
// @access  Privé
const envoyerMessage = async (req, res) => {
  try {
    const { destinataire, contenu } = req.body;

    const message = await Message.create({
      expediteur: req.user.id,
      destinataire,
      contenu,
    });

    await message.populate('expediteur', 'nom prenom role');
    await message.populate('destinataire', 'nom prenom role');

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir mes messages reçus
// @route   GET /api/messages/recus
// @access  Privé
const getMessagesRecus = async (req, res) => {
  try {
    const messages = await Message.find({ destinataire: req.user.id })
      .populate('expediteur', 'nom prenom role')
      .sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Obtenir mes messages envoyés
// @route   GET /api/messages/envoyes
// @access  Privé
const getMessagesEnvoyes = async (req, res) => {
  try {
    const messages = await Message.find({ expediteur: req.user.id })
      .populate('destinataire', 'nom prenom role')
      .sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Marquer message comme lu
// @route   PUT /api/messages/:id/lu
// @access  Privé
const marquerLu = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message introuvable.' });
    if (message.destinataire.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Accès refusé.' });
    }
    message.lu = true;
    await message.save();
    res.json({ success: true, message: 'Message marqué comme lu.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { envoyerMessage, getMessagesRecus, getMessagesEnvoyes, marquerLu };
