CREATE TABLE account_emails (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account (id) NOT NULL,
  email VARCHAR(255) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE (account, email)
);
COMMENT ON TABLE account IS 'all known emails associated to an account';
