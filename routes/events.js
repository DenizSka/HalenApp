const express = require('express');
const eventRouter = express.Router();
const eventController = require('../controller/eventController');


 // GET home page.

eventRouter.route('/')
  .get(eventController.index)
  .put(eventController.create);



module.exports = eventRouter;
