const express = require('express');
const auth = require('../auth/auth');
const router   = express.Router();

// Controllers
const room = require('../controllers/room.controller');

// room routes
router.post('/create', auth, room.create);
router.post('/join', auth, room.joinNewRoom);
router.get('/getAll', auth, room.selectAll);

module.exports = router;