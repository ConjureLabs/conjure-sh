CREATE TABLE container (
  id SERIAL PRIMARY KEY,
  repo INT REFERENCES watched_repo(id),
  branch VARCHAR(255) NOT NULL, -- 255 is max github length
  -- commit_sha VARCHAR(40) NOT NULL,
  host VARCHAR(200) NOT NULL,
  port INT NOT NULL,
  container_id VARCHAR(64) NOT NULL,
  url_uid VARCHAR(24) NOT NULL,
  is_active BOOLEAN NOT NULL,
  active_start TIMESTAMP WITH TIME ZONE NOT NULL,
  active_stop TIMESTAMP WITH TIME ZONE,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE container IS 'used to proxy inbound requests to running container';
