-- this file is only to be used in the dev environment

\c postgres;

-- kick any connections to this database
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'conjure' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS conjure;
CREATE DATABASE conjure WITH OWNER conjure_admin;
\c conjure;

-- table definitions
\i ../sql/tables/account.sql;
\i ../sql/tables/account-emails.sql;
\i ../sql/tables/account-github.sql;
\i ../sql/tables/account-login.sql;
\i ../sql/tables/watched-repos.sql;
\i ../sql/tables/containers.sql;
\i ../sql/tables/github-issue-comment.sql;
