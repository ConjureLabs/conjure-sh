CREATE TYPE account_login_service AS ENUM('github');

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account (id) NOT NULL,
  service account_login_service NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL
);
COMMENT ON TABLE account IS 'cosmo user records';
