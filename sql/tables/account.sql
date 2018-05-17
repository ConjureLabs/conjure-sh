CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(255) UNIQUE,
  stripe_id VARCHAR(40) UNIQUE,
  onboarded BOOLEAN,
  requires_installation BOOLEAN DEFAULTS FALSE,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE account IS 'conjure user records';
