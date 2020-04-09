CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  whatsApp VARCHAR,
  password VARCHAR,
  avatar_url VARCHAR,
  created_at TIMESTAMP
);

CREATE TABLE recipies(
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  image VARCHAR,
  chefe_id INTEGER,
  ingredients VARCHAR[],
  preparation VARCHAR[],
  infoadd VARCHAR,
  likes INTEGER,
  views INTEGER,
  created_at TIMESTAMP,
  FOREIGN KEY (chefe_id) REFERENCES users(id)
)