CREATE TABLE account_cards (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account (id) NOT NULL,
  stripe_id VARCHAR(40) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE (account, stripe_id)
);
COMMENT ON TABLE account_email IS 'credit cards associated with an account';
