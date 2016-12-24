-- this file is only to be used in the dev environment

\c postgres;

CREATE DATABASE cosmo WITH OWNER sonyc_admin;
\c cosmo;

-- table definitions
\i ../sql/tables/account.sql;
