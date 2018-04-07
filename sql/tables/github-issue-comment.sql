CREATE TABLE github_issue_comment (
  id SERIAL PRIMARY KEY,
  watched_repo INT REFERENCES watched_repo(id) NOT NULL,
  issue_id INT NOT NULL,
  comment_id INT NOT NULL,
  url VARCHAR(2000) NOT NULL,
  is_active BOOLEAN NOT NULL,
  s3_key VARCHAR(2000) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE,
  UNIQUE(watched_repo, issue_id, comment_id)
);
COMMENT ON TABLE github_issue_comment IS 'tracks github issue comments, posted by conjure';
