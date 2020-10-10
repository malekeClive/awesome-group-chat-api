const express = require('express');
const router =  express.Router();

// Controllers
const user = require('../controllers/user.controller');

// user routes
router.post('/create', user.create);

module.exports = router;