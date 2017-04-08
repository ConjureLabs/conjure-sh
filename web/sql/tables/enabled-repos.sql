CREATE TYPE repo_service_types AS ENUM('github', 'phabricator', 'other');
CREATE TYPE repo_vm_types AS ENUM('web');

CREATE TABLE enabled_repos (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account(id) NOT NULL,
  service repo_service_types NOT NULL,
  service_repo_id VARCHAR(255),
  vm repo_vm_types NOT NULL,
  url VARCHAR(2000),
  name VARCHAR(516),
  private BOOLEAN NOT NULL,
  disabled BOOLEAN NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE enabled_repos IS 'repos enabled to use voyant';
