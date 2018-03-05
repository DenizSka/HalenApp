const express = require('express');
const eventRouter = express.Router();
const axios = require('axios');
const eventController = require('../controller/eventController');

eventRouter.route('/')
  .get(eventController.index);


module.exports = eventRouter;
