CREATE TABLE watched_repo_account (
  id SERIAL PRIMARY KEY,
  account INT REFERENCES account(id) NOT NULL,
  watched_repo INT REFERENCES watched_repo(id) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE,
  UNIQUE (account, watched_repo)
);
COMMENT ON TABLE watched_repo_account IS 'watched conjure repos visible by accounts';
