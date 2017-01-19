-- this file is only to be used in the dev environment

\c postgres;

CREATE DATABASE sentry WITH OWNER sentry_admin;
\c sentry;

-- table definitions
\i ../sql/tables/account.sql;
\i ../sql/tables/account-github.sql;
\i ../sql/tables/account-login.sql;
