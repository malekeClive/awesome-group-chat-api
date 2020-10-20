const express = require('express');
const auth = require('../auth/auth');
const router =  express.Router();

// Controllers
const user = require('../controllers/user.controller');

// user routes
router.post('/create', auth, user.create);

module.exports = router;