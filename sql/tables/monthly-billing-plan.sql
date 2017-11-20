CREATE TABLE monthly_billing_plan (
  id SERIAL PRIMARY KEY,
  cost INT NOT NULL,
  parallel_container_limit INT NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL
);
COMMENT ON TABLE billing_plan IS 'lookup table for active and past monthly billing plans';
