const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Coach = require('../models/Coach');
const Client = require('../models/Client');
const Internaute = require('../models/Internaute');
const Notification = require('../models/Notification');

// Générer un token JWT
const genererToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc    Inscription
// @route   POST /api/auth/inscription
// @access  Public
const inscription = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, role, specialite, abonnement, entreprise } = req.body;

    // Vérifier si l'email existe déjà
    const userExistant = await User.findOne({ email });
    if (userExistant) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà utilisé.' });
    }

    let user;
    const roleChoisi = role || 'client';

    if (roleChoisi === 'admin') {
      user = await Admin.create({ nom, prenom, email, motDePasse, role: 'admin' });
    } else if (roleChoisi === 'coach') {
      user = await Coach.create({ nom, prenom, email, motDePasse, role: 'coach', specialite });
    } else if (roleChoisi === 'internaute') {
      user = await Internaute.create({ nom, prenom, email, motDePasse, role: 'internaute', entreprise });
    } else {
      // Générer code de confirmation pour le client
      const codeConfirmation = Math.random().toString(36).substring(2, 8).toUpperCase();
      user = await Client.create({ nom, prenom, email, motDePasse, role: 'client', abonnement, codeConfirmation });

      // Créer une notification de bienvenue
      await Notification.create({
        type: 'confirmation',
        contenu: `Bienvenue ${prenom} ! Votre code de confirmation est : ${codeConfirmation}`,
        codeConfirmation,
        destinataire: user._id,
      });
    }

    const token = genererToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Inscription réussie.',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Connexion
// @route   POST /api/auth/connexion
// @access  Public
const connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await user.comparePassword(motDePasse);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }

    const token = genererToken(user._id);

    res.json({
      success: true,
      message: 'Connexion réussie.',
      token,
      user: {
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Profil connecté
// @route   GET /api/auth/moi
// @access  Privé
const moi = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-motDePasse');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Modifier mot de passe
// @route   PUT /api/auth/modifier-mot-de-passe
// @access  Privé
const modifierMotDePasse = async (req, res) => {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await user.comparePassword(ancienMotDePasse);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Ancien mot de passe incorrect.' });
    }

    user.motDePasse = nouveauMotDePasse;
    await user.save();

    res.json({ success: true, message: 'Mot de passe modifié avec succès.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { inscription, connexion, moi, modifierMotDePasse };
