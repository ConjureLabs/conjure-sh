#! /bin/bash
# Called on `npm start`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e; # die on any error

export CONJURE_WORKER_DIR=$WORKER_DIR;
export NODE_PATH=$(cd $APP_DIR; cd server; pwd);
export PORT=3000;
source $APP_DIR/.profile;

source $BASH_DIR/postgres/init-local.sh;

set +e; # no longer die on any error
( cd $APP_DIR && webpack --progress --colors --watch ) &
PIDS[0]=$!;
( cd $APP_DIR && nodemon --legacy-watch ./server/ ) &
PIDS[1]=$!;
announce "App available at http://localhost:3000/";
PIDS[2]=$!;
# by tracking pids, and using this trap, all tracked processes will be killed after a ^C
# see http://stackoverflow.com/questions/9023164/in-bash-how-can-i-run-multiple-infinitely-running-commands-and-cancel-them-all
trap "kill ${PIDS[*]} && wait ${PIDS[*]} 2>/dev/null" SIGINT;
wait;