#! /bin/bash
# This is called when you `npm start` for Development - it boots up docker, which will then (possibly) build, and then init the running docker instance

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

npm run-script build;

if [ ! -d "$APP_DIR/node_modules" ]; then
  progress "Installing modules";
  npm install;
fi

npm run-script compile --watch > $APP_DIR./webpack-build.log 2>/dev/null &
PIDS[0]=$!;

eval "$(docker-machine env cosmo)";
eval "$(cd $APP_DIR; cd ..; touch .profile; source .profile)";

APP_IP=$(docker-machine ip cosmo);
NODE_PATH="$DESTINATION_DIR/modules";
progress "Connecting to Docker";
# see https://github.com/CentOS/sig-cloud-instance-images/issues/54
docker run -i -t \
  --privileged \
  --tmpfs /run \
  --tmpfs /run/lock \
  -p 80:3000 \
  --cap-add SYS_ADMIN \
  -v $APP_DIR:$DESTINATION_DIR \
  -v /sys/fs/cgroup:/sys/fs/cgroup:ro \
  -w $DESTINATION_DIR \
  --dns 4.4.4.4 --dns 8.8.4.4 \
  -e "container=docker" \
  -e NODE_ENV="${NODE_ENV}" \
  -e APP_IP="${APP_IP}" \
  --net="host" \
  cosmo/latest bash;

trap "kill ${PIDS[*]} && wait ${PIDS[*]} 2>/dev/null" SIGINT;
wait;
