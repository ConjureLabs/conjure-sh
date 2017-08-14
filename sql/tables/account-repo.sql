CREATE TYPE repo_access_rights_types AS ENUM('r', 'rw');

CREATE TABLE account_repo (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account(id) NOT NULL,
  service repo_service_types NOT NULL,
  service_repo_id VARCHAR(255),
  url VARCHAR(2000),
  org VARCHAR(516),
  name VARCHAR(516),
  access_rights repo_access_rights_types NOT NULL,
  private BOOLEAN NOT NULL,
  disabled BOOLEAN NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE,
  UNIQUE (service, service_repo_id, account)
);
COMMENT ON TABLE account_repo IS 'repos visible by conjure accounts';
