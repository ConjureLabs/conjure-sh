#! /bin/bash
# This initializes the local Postgres with needed fixtures

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

sudo su - postgres;

progress "Spinning up database";
service postgresql-9.5 start;

# db fixtures
progress "populating database";
if ! hash psql 2>/dev/null; then
  error "Could not populate database - missing psql command (this should not happen)";
  exit 1;
fi
if ! hash createuser; then
  error "Could not populate database - missing createuser command (this should not happen)";
  exit 1;
fi

createuser --createdb --adduser --no-password cosmo_admin;

cd $APP_DIR/sql/;
psql postgres --username=cosmo_admin -w --file=\"init-$NODE_ENV.sql\" --quiet;

exit 0; # exit form postgres user login
