const express = require('express');
const router   = express.Router();

// Controllers
const chat = require('../controllers/chat.controller');

// Chat routes
router.post('/create', chat.create);
router.get('/getAll', chat.getAll);

module.exports = router;