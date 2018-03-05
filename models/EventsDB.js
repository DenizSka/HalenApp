const db = require('../config/config');
// const pgp = require('pg-promise')();
// const db = pgp(dbConfig);


module.exports = {

  findAll() {
    return db.many(`
      SELECT *
        FROM events
      ORDER BY id
    `);
  },

  findById(id) {
    return db.oneOrNone(`
    SELECT * FROM events
    WHERE id = $1
  `, id);
  },

  save(event) {
    console.log('this is event in model:', events);
    return db.one(`
       INSERT INTO events (displayName, type, venue, dateEvent, uri) VALUES ($1 ,$2 ,$3, $4, $5) RETURNING *
      `, [event.displayName, event.type, event.venue, event.dateEvent, event.uri]);
  },


  // update(event, id) {
  //   return db.one(`
  //     UPDATE events

  //       city = $/city/,
  //       name = $/name/,
  //       main = $/formatted_address/,
  //       wiki = $/description/
  //     WHERE id = $/id/
  //     RETURNING *
  //     `, [event.city, event.name, event.formatted_address, event.description, id]);
  // },

  destroy(id) {
    return db.none(`
      DELETE
        FROM events
       WHERE id = $1
    `, id);
  },

};

