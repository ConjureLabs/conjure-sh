CREATE TABLE account_monthly_billing_plan (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account (id) NOT NULL,
  monthly_billing_plan INT REFERENCES monthly_billing_plan (id) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  activated TIMESTAMP WITH TIME ZONE,
  deactivated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE account_monthly_billing_plan IS 'lookup of current and past monthly billing plans, associated with an account';
