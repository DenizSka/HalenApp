const db = require('../config/config');
const pgp = require('pg-promise')();
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
    console.log('this is save in model:', event);
    return db.one(`
       INSERT INTO events (displayName, type, venue, dateEvent, uri) VALUES ($/displayName/, $/type/, $/venue/, $/dateEvent/, $/uri/) RETURNING *
      `, event);
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

