const express = require('express');
const router =  express.Router();

const login = require('../controllers/login.controller');

// Routes directory
const user = require('../routes/user.routes');
const room = require('../routes/room.routes');
const chat = require('../routes/chat.routes');

const routes = app => {
  // login
  app.use(router.post('/', login.login));

  // User routes
  app.use('/api/user', user);

  // Room routes
  app.use('/api/room', room);

  // Room routes
  app.use('/api/chat', chat);
}

module.exports = routes;
