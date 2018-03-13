var express = require('express');
var eventRouter = express.Router();
const eventController = require('../controller/eventController');

/* GET past events */

eventRouter.route('/pastevents')
  .get(eventController.pastindex)
  .delete(eventController.destroy);

// router.get('/', function(req, res, next) {
//   EventsDB.findAll()
//   .then((events) => {
//     res.json({ events: events})
//   }).catch((err) => { console.log(err); next(err)})
// });

// router.put('/', function(req, res, next) {
//   let eventsBody = req.body
//   let event = {
//    displayName: eventsBody.displayName,
//    type: eventsBody.type,
//    venue: eventsBody.venue,
//    dateEvent: eventsBody.dateEvent,
//    url: eventsBody.url
//   }

//   EventsDB.save(event)
//   .then((events) => {res.json(events)})
//   .catch((err) => { console.log(err); next(err)})
// });

module.exports = eventRouter;
