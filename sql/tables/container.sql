CREATE TYPE container_ecs_state AS ENUM('spinning up', 'spinning down', 'running', 'stopped', 'updating');

CREATE TABLE container (
  id SERIAL PRIMARY KEY,
  repo INT REFERENCES watched_repo(id),
  branch VARCHAR(255) NOT NULL, -- 255 is max github length
  -- commit_sha VARCHAR(40) NOT NULL,
  public_ip VARCHAR(40),
  host_port INT,
  cluster_arn VARCHAR(100),
  task_arn VARCHAR(100),
  task_definition_arn VARCHAR(100),
  container_id VARCHAR(64),
  url_uid VARCHAR(24),
  is_active BOOLEAN NOT NULL,
  ecs_state container_ecs_state NOT NULL,
  active_start TIMESTAMP WITH TIME ZONE,
  active_end TIMESTAMP WITH TIME ZONE,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE container IS 'used to proxy inbound requests to running container';
