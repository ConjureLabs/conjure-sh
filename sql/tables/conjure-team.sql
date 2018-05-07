CREATE TABLE conjure_team (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(40) NOT NULL,
  twitter_handle VARCHAR(60),
  github_handle VARCHAR(60),
  pic_name VARCHAR(60),
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE conjure_team IS 'used to identify Conjure team members';

INSERT INTO conjure_team(full_name, twitter_handle, github_handle, pic_name, added)
VALUES ('Tim Marshall', 'timothymarshall', 'tmarshall', 'mars.png', NOW());
