\c songkick_db;

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  displayName VARCHAR(255),
  type VARCHAR(255),
  venue VARCHAR(255),
  dateEvent VARCHAR(255),
  uri VARCHAR(16384)
);
