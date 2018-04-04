#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e; # die on any error

export CONJURE_WORKER_DIR=$WORKER_DIR;
export NODE_PATH=$(cd $APP_DIR; cd server; pwd);
export PORT=3000;

if [ ! $CONJURE_PROFILE_PATH = "" ]; then
  source "$CONJURE_PROFILE_PATH";
else
  source $APP_DIR/../conjure-core/.profile;
fi

node $APP_DIR/scripts/stylus/prepare.js;
node $APP_DIR/scripts/config/generate-client-config.js;

if [ ! "$FRESH_DB" = "" ]; then
  source $BASH_DIR/postgres/init-local.sh;
fi

cd $APP_DIR;
node ./server/;
