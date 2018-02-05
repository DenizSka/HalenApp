const eventsDB = require('../models/EventsDB');

module.exports = {

  index(req, res, next) {
    eventsDB.findAll()
      .then((events) => {
        res.status(200).json({
          message: 'success',
          data: {
            events,
          },
        });
      })
      .catch(err => next(err));
  },

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

  // update(req, res, next) {
  //   eventsDB.update({
  //     name: req.body.name,
  //     city: req.body.city,
  //     formated_address: req.body.formatted_address,
  //     description: req.body.description,
  //   }, req.params.id).then((event) => {
  //     console.log(event, 'after post');
  //     res.json({
  //       message: 'event updated successfully!',
  //       data: { event },
  //     });
  //   }).catch(err => next(err));
  // },

  destroy(req, res, next) {
    eventsDB.destroy(req.params.id)
      .then(() => {
        res.json({
          message: 'event has been deleted',
        });
      })
      .catch(err => next(err));
  },

};

