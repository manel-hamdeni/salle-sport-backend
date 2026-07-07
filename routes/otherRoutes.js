const express = require('express');
const notifRouter = express.Router();
const salleRouter = express.Router();

const { getMesNotifications, marquerLue, supprimerNotification } = require('../controllers/notificationController');
const { creerSalle, getSalle, modifierSalle } = require('../controllers/salleController');
const { protect, authorize } = require('../middlewares/auth');

// Notifications
notifRouter.get('/', protect, getMesNotifications);
notifRouter.put('/:id/lu', protect, marquerLue);
notifRouter.delete('/:id', protect, supprimerNotification);

// Salle
salleRouter.get('/', getSalle);
salleRouter.post('/', protect, authorize('admin'), creerSalle);
salleRouter.put('/:id', protect, authorize('admin'), modifierSalle);

module.exports = { notifRouter, salleRouter };
