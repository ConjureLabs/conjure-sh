CREATE TABLE account_github (
  id SERIAL PRIMARY KEY,
  github_id INT NOT NULL UNIQUE,
  account INT REFERENCES account(id) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  photo VARCHAR(255),
  access_token VARCHAR(255),
  access_token_assumed_valid BOOLEAN NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE account_github IS 'conjure github user records';
