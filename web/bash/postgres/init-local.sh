#! /bin/bash
# This initializes the local Postgres with needed fixtures

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

progress "Spinning up database";
cp $APP_DIR/server/conf/pg_hba.conf /var/lib/pgsql/9.5/data/pg_hba.conf;
service postgresql-9.5 start;

# db fixtures
progress "Populating database";
if ! hash psql 2>/dev/null; then
  error "Could not populate database - missing psql command (this should not happen)";
  exit 1;
fi
if ! hash createuser; then
  error "Could not populate database - missing createuser command (this should not happen)";
  exit 1;
fi

sudo su - postgres -c "createuser --createdb --adduser --no-password sentry_admin";

cd $APP_DIR/sql/;
psql postgres --username=sentry_admin -w --file="init-$NODE_ENV.sql" --quiet;
