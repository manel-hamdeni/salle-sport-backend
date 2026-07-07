const express = require('express');
const router = express.Router();
const { inscription, connexion, moi, modifierMotDePasse } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.post('/inscription', inscription);
router.post('/connexion', connexion);
router.get('/moi', protect, moi);
router.put('/modifier-mot-de-passe', protect, modifierMotDePasse);

module.exports = router;
