const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controller/eventController');




eventRouter.route('/')
  .get(eventController.index)
  .post(eventController.create);



module.exports = eventRouter;
