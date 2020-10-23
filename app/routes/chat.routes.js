const express = require('express');
const auth = require('../auth/auth');
const router   = express.Router();

// Controllers
const chat = require('../controllers/chat.controller');

// Chat routes
router.post('/create', auth, chat.create);
router.post('/join', auth, chat.joinNewRoom);
router.get('/getAll', auth, chat.selectAll);

module.exports = router;