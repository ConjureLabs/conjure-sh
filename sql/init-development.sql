-- this file is only to be used in the dev environment

\c postgres;

-- kick any connections to this database
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'voyant' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS voyant;
CREATE DATABASE voyant WITH OWNER voyant_admin;
\c voyant;

-- table definitions
\i ../sql/tables/account.sql;
\i ../sql/tables/account-github.sql;
\i ../sql/tables/account-login.sql;
\i ../sql/tables/watched-repos.sql;
\i ../sql/tables/container-proxies.sql;
