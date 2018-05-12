-- this file is only to be used in the dev environment

\c postgres;

-- kick any connections to this database
SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'conjure' AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS conjure;
CREATE DATABASE conjure WITH OWNER conjure_admin;
\c conjure;

-- table definitions
\i ./tables/account.sql;
\i ./tables/account-card.sql;
\i ./tables/account-email.sql;
\i ./tables/account-github.sql;
\i ./tables/account-login.sql;
\i ./tables/watched-repo.sql;
\i ./tables/container.sql;
\i ./tables/github-issue-comment.sql;
\i ./tables/account-repo.sql;
\i ./tables/billing-plan.sql;
\i ./tables/github-org-billing-plan.sql;
\i ./tables/ecr-repo.sql
\i ./tables/conjure-team.sql
\i ./tables/blog.sql
\i ./tables/billing-transaction.sql;
\i ./tables/container-transaction-log.sql;
