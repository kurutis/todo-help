CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT,
  done BOOLEAN,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);