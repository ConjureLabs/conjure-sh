#! /bin/bash
# Called on `yarn start`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e; # die on any error

export CONJURE_WORKER_DIR=$WORKER_DIR;
export NODE_PATH=$(cd $APP_DIR; cd server; pwd);
export PORT=3000;
source $APP_DIR/.profile;
node $APP_DIR/scripts/stylus/prepare.js;
node $APP_DIR/scripts/config/generate-client-config.js;

if [ "$KEEP_DB" = "" ]; then
  source $BASH_DIR/postgres/init-local.sh;
fi

cd $APP_DIR;
yarn run dev;
