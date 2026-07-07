const Notification = require('../models/Notification');

// @desc    Mes notifications
// @route   GET /api/notifications
// @access  Privé
const getMesNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ destinataire: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Marquer notification comme lue
// @route   PUT /api/notifications/:id/lu
// @access  Privé
const marquerLue = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ success: false, message: 'Notification introuvable.' });
    notif.lu = true;
    await notif.save();
    res.json({ success: true, message: 'Notification lue.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Supprimer une notification
// @route   DELETE /api/notifications/:id
// @access  Privé
const supprimerNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notification supprimée.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMesNotifications, marquerLue, supprimerNotification };
