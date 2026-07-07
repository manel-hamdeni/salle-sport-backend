const express = require('express');
const router = express.Router();
const {
  creerPlanning, getTousPlanning, getPlanningById,
  modifierPlanning, supprimerPlanning, sInscrireSeance, seDesinscrireSeance
} = require('../controllers/planningController');
const { protect, authorize } = require('../middlewares/auth');

router.get('/', getTousPlanning);
router.get('/:id', getPlanningById);
router.post('/', protect, authorize('admin'), creerPlanning);
router.put('/:id', protect, authorize('admin'), modifierPlanning);
router.delete('/:id', protect, authorize('admin'), supprimerPlanning);
router.post('/:id/inscription', protect, authorize('client'), sInscrireSeance);
router.delete('/:id/inscription', protect, authorize('client'), seDesinscrireSeance);

module.exports = router;
