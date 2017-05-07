CREATE TABLE account_email (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account (id) NOT NULL,
  email VARCHAR(255) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE (account, email)
);
COMMENT ON TABLE account_email IS 'all known emails associated to an account';
