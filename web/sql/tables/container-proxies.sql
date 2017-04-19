CREATE TABLE container_proxies (
  id SERIAL PRIMARY KEY,
  repo INT REFERENCES watched_repos(id),
  commit_sha VARCHAR(40) NOT NULL,
  host VARCHAR(200) NOT NULL,
  port INT NOT NULL,
  container_id VARCHAR(64) NOT NULL,
  url_uid VARCHAR(24) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE container_proxies IS 'used to proxy inbound requests to running containers';
