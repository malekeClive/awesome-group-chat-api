const express = require('express');
const auth = require('../auth/auth');
const router   = express.Router();

// Controllers
const chat = require('../controllers/chat.controller');

// chat routes
router.get('/getChat', auth, chat.getChatById);

module.exports = router;