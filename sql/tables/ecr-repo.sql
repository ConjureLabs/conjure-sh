CREATE TABLE ecr_repo (
  id SERIAL PRIMARY KEY,
  watched_repo_id INT REFERENCES watched_repo(id),
  name VARCHAR(2000) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE (watched_repo_id)
);
COMMENT ON TABLE ecr_repo IS 'AWS ECR repos created per user project';
