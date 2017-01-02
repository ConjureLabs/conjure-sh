#! /bin/bash
# Called on `npm start`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if [ "$CONTAINER" != "docker" ]; then
  if [ "$NODE_ENV" == "production" ]; then
    error "Production should not be run from outside of a deployed Docker image";
    exit 1;
  fi
  source $BASH_DIR/docker/run.sh;
else
  # assuming within a docker image, at this point
  set -e; # die on any error
  source $BASH_DIR/docker/prepare-app.sh;

  if [ "$NODE_ENV" == "production" ]; then
    source $BASH_DIR/npm/compile.sh;
    set +e; # no longer die on any error
    pm2 start $APP_DIR --no-daemon;
  else
    # must be a local running app, so can be a little more careless, than on prod
    set +e; # no longer die on any error
    ( cd $APP_DIR && nodemon --legacy-watch ./server/ ) &
    PIDS[0]=$!;
    announce "App available at $APP_IP";
    tail -f $APP_DIR./webpack-build.log &
    PIDS[1]=$!;
    # by tracking pids, and using this trap, all tracked processes will be killed after a ^C
    # see http://stackoverflow.com/questions/9023164/in-bash-how-can-i-run-multiple-infinitely-running-commands-and-cancel-them-all
    trap "kill ${PIDS[*]} && wait ${PIDS[*]} && exit 0 2>/dev/null" SIGINT;
    wait;
  fi
fi
