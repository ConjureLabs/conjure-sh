CREATE TABLE github_app_installation (
  id SERIAL PRIMARY KEY,
  github_id INT NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL,
  github_account_type VARCHAR(20) NOT NULL,
  installation_id INT NOT NULL UNIQUE,
  photo VARCHAR(255),
  last_verified_active TIMESTAMP WITH TIME ZONE NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE github_app_installation IS 'records of each github app installation';
