const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = require('pg-promise')(options);

const config = {
  host: 'localhost',
  port: 5432,
  database: 'songkick_db',
};

function setDatabase() {
  return pgp(config);
}

const db = setDatabase();

module.exports = db;
