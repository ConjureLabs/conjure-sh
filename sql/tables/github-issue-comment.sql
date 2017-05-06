CREATE TABLE github_issue_comment (
  id SERIAL PRIMARY KEY,
  watched_repo INT REFERENCES watched_repos(id) NOT NULL,
  issue_id INT NOT NULL,
  url VARCHAR(2000) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE github_issue_comment IS 'tracks github issue comments, posted by conjure';
