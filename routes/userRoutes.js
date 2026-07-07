const express = require('express');
const router = express.Router();
const { getTousUsers, getUserById, modifierUser, supprimerUser, getCoachsDisponibles, getStats } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');

router.get('/coachs/disponibles', getCoachsDisponibles);
router.get('/stats', protect, authorize('admin'), getStats);
router.get('/', protect, authorize('admin'), getTousUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, modifierUser);
router.delete('/:id', protect, authorize('admin'), supprimerUser);

module.exports = router;
