CREATE TABLE billing_transaction (
  id SERIAL PRIMARY KEY,
  billed_amount_cents INT,
  recipient INT REFERENCES account(id),
  transaction_identifier VARCHAR(36),
  added TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE billing_transaction IS 'tracks billing transactions, where a number of container transactions can be grouped and billed';
