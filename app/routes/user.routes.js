const express = require('express');
const auth = require('../auth/auth');
const router =  express.Router();

// Controllers
const user = require('../controllers/user.controller');

// user routes
router.post('/create', user.create);
router.post('/find', user.find);

module.exports = router;