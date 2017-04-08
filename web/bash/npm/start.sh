#! /bin/bash
# Called on `npm start`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e; # die on any error

export NODE_PATH=$(cd $DESTINATION_DIR; cd server; pwd);
export PORT=3000;
source $APP_DIR/.profile;

set +e; # no longer die on any error
( cd $APP_DIR && nodemon --legacy-watch ./server/ ) &
PIDS[0]=$!;
announce "App available at http://localhost:3000/";
tail -f $APP_DIR./webpack-build.log &
PIDS[1]=$!;
# by tracking pids, and using this trap, all tracked processes will be killed after a ^C
# see http://stackoverflow.com/questions/9023164/in-bash-how-can-i-run-multiple-infinitely-running-commands-and-cancel-them-all
trap "kill ${PIDS[*]} && wait ${PIDS[*]} 2>/dev/null" SIGINT;
wait;
