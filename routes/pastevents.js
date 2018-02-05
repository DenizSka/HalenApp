var express = require('express');
var router = express.Router();
var EventsDB = require('../models/EventsDB')

/* GET home page. */
router.get('/', function(req, res, next) {
  //let eventsDB = new EventsDB();
  EventsDB.findAll()
  .then((events) => {
    res.json({ events: events})
  }).catch((err) => { console.log(err); next(err)})
  //res.json({events: [ {"name": "X"}, {"name": "Y"}]})
});

/* GET home page. */
router.put('/', function(req, res, next) {
  //let eventsDB = new EventsDB();
  let eventsBody = req.body
  let event = {
   displayName: eventsBody.displayName,
   type: eventsBody.type ,
   venue: eventsBody.venue ,
   dateEvent: eventsBody.dateEvent ,
   url: eventsBody.url
  }

  EventsDB.save(event)
  .then((events) => {res.json(events)})
  .catch((err) => { console.log(err); next(err)})
  //res.json({events: [ {"name": "X"}, {"name": "Y"}]})
});

module.exports = router;
