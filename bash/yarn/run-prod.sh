#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e; # die on any error

export CONJURE_WORKER_DIR=$WORKER_DIR;
export NODE_PATH=$(cd $APP_DIR; cd server; pwd);
export PORT=3000;

source $APP_DIR/.profile;

cd $APP_DIR;
node ./server/;
