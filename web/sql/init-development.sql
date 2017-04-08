-- this file is only to be used in the dev environment

\c postgres;

DROP DATABASE IF EXISTS voyant;
CREATE DATABASE voyant WITH OWNER voyant_admin;
\c voyant;

-- table definitions
\i ../sql/tables/account.sql;
\i ../sql/tables/account-github.sql;
\i ../sql/tables/account-login.sql;
\i ../sql/tables/enabled-repos.sql;
