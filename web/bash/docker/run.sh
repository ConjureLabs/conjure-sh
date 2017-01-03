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
eval "$(cd $APP_DIR; touch .profile; cat .profile)";

# we read in .profile, but now we have to pass the env vars to docker
# to do this automagically, we're going to parse out the env names
sed 's/^export //' $APP_DIR/.profile > $APP_DIR/.profile.tmp;
sed 's/=.*$//' $APP_DIR/.profile.tmp > $APP_DIR/.profile.2.tmp;
rm $APP_DIR/.profile.tmp;

# see https://github.com/CentOS/sig-cloud-instance-images/issues/54
DOCKER_RUN_COMMAND="docker run -i -t \
  --privileged \
  --tmpfs /run \
  --tmpfs /run/lock \
  -p 80:3000 \
  --cap-add SYS_ADMIN \
  -v $APP_DIR:$DESTINATION_DIR \
  -v /sys/fs/cgroup:/sys/fs/cgroup:ro \
  -w $DESTINATION_DIR \
  --dns 4.4.4.4 --dns 8.8.4.4 \
  -e \"container=docker\" \
  -e NODE_ENV=\"${NODE_ENV}\" \
  -e APP_IP=\"${APP_IP}\" \
  ";

while read p; do
  # see http://stackoverflow.com/questions/369758/how-to-trim-whitespace-from-a-bash-variable
  TRIMMED_LINE="$(sed -e 's/[[:space:]]*$//' <<<${p})";
  if [ "$TRIMMED_LINE" != ""; ]; then
    DOCKER_RUN_COMMAND+="-e ${p}=\${${p}} \
  ";
  fi
done < $APP_DIR/.profile.2.tmp;
rm $APP_DIR/.profile.2.tmp;

DOCKER_RUN_COMMAND+='cosmo/latest bash;';

APP_IP=$(docker-machine ip cosmo);
NODE_PATH="$DESTINATION_DIR/modules";
progress "Connecting to Docker";

eval "$DOCKER_RUN_COMMAND";

trap "kill ${PIDS[*]} && wait ${PIDS[*]} 2>/dev/null" SIGINT;
wait;
