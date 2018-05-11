CREATE TYPE container_transaction_action AS ENUM('build', 'ran');

CREATE TABLE container_transaction_log (
  id SERIAL PRIMARY KEY,
  container_id INT REFERENCES container(id) NOT NULL,
  billing_plan INT REFERENCES billing_plan(id) NOT NULL,
  action container_transaction_action NOT NULL,
  action_start TIMESTAMP WITH TIME ZONE NOT NULL,
  action_end TIMESTAMP WITH TIME ZONE NOT NULL,
  billed_at TIMESTAMP WITH TIME ZONE,
  billed_amount_cents INT,
  added TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE container_transaction_log IS 'tracks container billable actions';
