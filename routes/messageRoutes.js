const express = require('express');
const router = express.Router();
const { envoyerMessage, getMessagesRecus, getMessagesEnvoyes, marquerLu } = require('../controllers/messageController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, envoyerMessage);
router.get('/recus', protect, getMessagesRecus);
router.get('/envoyes', protect, getMessagesEnvoyes);
router.put('/:id/lu', protect, marquerLu);

module.exports = router;
