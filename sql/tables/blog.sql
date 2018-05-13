CREATE TABLE blog (
  id SERIAL PRIMARY KEY,
  mdx_name VARCHAR(60) UNIQUE,
  authors INT[], -- references conjure_team, but psql arrays can't use fkeys :(
  added TIMESTAMP WITH TIME ZONE NOT NULL,
  updated TIMESTAMP WITH TIME ZONE
);
COMMENT ON TABLE blog IS 'collection of blog post references';

INSERT INTO blog (mdx_name, authors, added)
VALUES ('why-conjure', ARRAY[1], NOW());
