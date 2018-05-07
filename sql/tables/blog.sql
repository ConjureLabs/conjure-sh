CREATE TABLE blog (
  id SERIAL PRIMARY KEY,
  mdx_name VARCHAR(60),
  author INT REFERENCES conjure_team(id),
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE blog IS 'collection of blog post references';

INSERT INTO blog (mdx_name, author, added)
VALUES ('why-conjure', 1, NOW());
