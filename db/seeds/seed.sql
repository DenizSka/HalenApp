-- psql -f db/migrations/migration.sql
-- psql -f db/seeds/seed.sql
\c songkick_db;


INSERT INTO events (displayName, type, venue, dateEvent, url) VALUES
  ('American Songbook 2018', 'Festival', 'The Appel Room at Jazz at Lincoln Center', '2018-03-27', 'http://www.songkick.com/festivals/2166069-american-songbook/id/32428904-american-songbook-2018?utm_source=47547&utm_medium=partner')
