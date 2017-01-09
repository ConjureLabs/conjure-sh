CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  github_id INT NOT NULL,
  account INT REFERENCES account(id) NOT NULL,
  username VARCHAR(255),
  name VARCHAR(255),
  email VARCHAR(255),
  photo VARCHAR(255),
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE account IS 'cosmo user records';