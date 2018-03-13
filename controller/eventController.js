const eventsDB = require('../models/EventsDB');
const axios = require('axios');

module.exports = {

  index(req, res, next) {
      axios.get(`https://api.songkick.com/api/3.0/metro_areas/7644/calendar.json?apikey=bykUUqMTtEu6iQV2`)
      .then((songkickResponse) => {
        console.log('backend', songkickResponse.data.resultsPage.results.event)
        res.json(songkickResponse.data.resultsPage.results.event)
        /*
        this.setState({
          apiData: res.data.resultsPage.results.event,
          apiDataLoaded: true,
        });
        */
      })
      .catch(err => console.log(err));
  },

  pastindex(req, res, next) {
    console.log('in pastindex function');
      eventsDB.findAll()
      .then((events) => {
        res.json({ events: events})
      }).catch((err) => { console.log(err); next(err)})
  },


  create(req, res, next) {
    console.log('in save function');
      let eventsBody = req.body
      let event = {
       displayName: eventsBody.displayName,
       type: eventsBody.type,
       venue: eventsBody.venue,
       dateEvent: eventsBody.dateEvent,
       uri: eventsBody.uri
      };
      eventsDB.save(event)
      .then((events) => {
        console.log(`this is the thing I want to see ${json.stringify(events)}`);
        res.json({
          message: 'event added successfully!',
          data: { events },
        });
      })
      .catch(err => next(err));
  },

  //       res.json(events)})
  //     .catch((err) => { console.log(err); next(err)})
  // },


  getOne(req, res, next) {
    eventsDB.findById(req.params.id)
      .then((event) => {
        // console.log(event);
        res.json({
          message: 'ok',
          data: { event },
        });
      })
      .catch(err => next(err));
  },

  // create(req, res, next) {
  //   console.log('in create function');
  //   eventsDB.save({
  //     name: req.body.name,
  //     city: req.body.city,
  //     formatted_address: req.body.formatted_address,
  //     description: req.body.description,
  //   })
  //     .then((event) => {
  //       console.log(`this is the thing I want to see ${json.stringify(event)}`);
  //       res.json({
  //         message: 'event added successfully!',
  //         data: { event },
  //       });
  //     })
  //     .catch(err => next(err));
  // },


  destroy(req, res, next) {
    eventsDB.destroy(req.params.id)
      .then(() => {
        res.json({
          message: 'event has been deleted',
        });
      })
      .catch(err => next(err));
  }

};
