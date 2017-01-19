#! /bin/bash
## Called on `npm run-script build`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

createMachine() {
  progress "Creating machine";
  docker-machine -D create -d virtualbox --virtualbox-memory 8192 --virtualbox-cpu-count -1 sentry;
  # leaving these lines in - may help when eventually properly resolving issue #10
  # docker-machine stop sentry;
  # SERVER_ABS_PATH=$(cd $APP_DIR./server; pwd);
  # VBoxManage sharedfolder add sentry --automount --name /var/sentry/web/server/ --hostpath $SERVER_ABS_PATH;
  startMachine;
}

startMachine() {
  progress "Starting machine";
  docker-machine start sentry;
  sleep 2; # if you kick off the next step too early, it may fail
  setEnvironmentVars;
}

setEnvironmentVars() {
  # may need to regenrate certs if instance is stale
  if [ $(docker-machine env sentry | grep "Error checking TLS connection") ]; then
    regenerateCerts;
  else
    progress "Setting environment";
    eval "$(docker-machine env sentry)";
    continueBuild;
  fi
}

regenerateCerts() {
  # hopefully this never ends up being an infinite loop
  progress "Regenerating docker certs";
  docker-machine regenerate-certs sentry -f;
  setEnvironmentVars;
}

continueBuild() {
  progress "Building image";
  docker build -f "$APP_DIR/$PREFIX.Dockerfile" -t sentry/latest . ;
}

case $NODE_ENV in
  "development")
    PREFIX="local"
    ;;
  "staging")
    PREFIX="local"
    ;;
  "test")
    PREFIX="local"
    ;;
  "production")
    PREFIX="prod"
    ;;
  *)
    error "NODE_ENV of \"$NODE_ENV\" is not recognized";
    exit 1;
    ;;
esac

# making sure the docker machine exists
CHECK=$(docker-machine ls | grep sentry | wc -l);
if [ $CHECK -eq 0 ]; then
  error "docker machine does not exist";
  echo -e "\nWant to create it? [y / n]: ";
  read RESPONSE;
  case $(echo "$RESPONSE" | awk '{print tolower($0)}') in
    "y")
      createMachine;
      ;;
    "yes")
      createMachine;
      ;;
    "n")
      exit 0;
      ;;
    "no")
      exit 0;
      ;;
    *)
      error "did not recognize value";
      exit 1;
  esac
else
  CHECK=$(docker-machine status sentry);
  if [ "$CHECK" != "Running" ]; then
    startMachine;
  else
    if [ "$DOCKER_MACHINE_NAME" != "sentry" ]; then
      setEnvironmentVars;
    else
      continueBuild;
    fi
  fi
fi
