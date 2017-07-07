CREATE TABLE account_email (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account (id) NOT NULL,
  stripe_id VARCHAR(40) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE (account, stripe_id)
);
COMMENT ON TABLE account_email IS 'all known emails associated to an account';
