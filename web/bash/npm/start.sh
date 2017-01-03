#! /bin/bash
# Called on `npm start`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if [ "$CONTAINER" != "docker" ]; then
  if [ "$NODE_ENV" == "production" ]; then
    error "Production should not be run from outside of a deployed Docker image";
    exit 1;
  fi
  # brew services start nginx; # todo: attempt to start it?
  source $BASH_DIR/docker/run.sh;

  if [ "$NODE_ENV" != "production" ]; then
    progress "Reconfiguring and restarting Nginx";

    # always backing up the nginx config
    cp /usr/local/etc/nginx/nginx.conf ./.nginx.conf.bk

    COSMO_NGINX_CONF_COUNT=$(cat /usr/local/etc/nginx/nginx.conf | grep "# < COSMO CONF " | wc -l);
    if [ $COSMO_NGINX_CONF_COUNT == 0 ]; then
      # config for this app has not yet been added to nginx
      # doing that now
      # this is assuming the last {} block of the nginx config is for http - may have to update this later
      sed '$s/\}/\
# < COSMO CONF START >\
\
# < COSMO CONF END >\
\
}/' /usr/local/etc/nginx/nginx.conf > $APP_DIR/.nginx.conf;
      mv $APP_DIR/.nginx.conf /usr/local/etc/nginx/nginx.conf;
    fi

    # find COSMO CONF block, and replacing it with the new IP needed
    cp /usr/local/etc/nginx/nginx.conf $APP_DIR/.nginx.conf;
    COSMO_NGINX_CONF_START=$(grep -n '# < COSMO CONF START >' $APP_DIR/.nginx.conf | cut -d: -f 1);
    COSMO_NGINX_CONF_END=$(grep -n '# < COSMO CONF END >' $APP_DIR/.nginx.conf | cut -d: -f 1);
    {
      head -n $(($COSMO_NGINX_CONF_START-1)) $APP_DIR/.nginx.conf
      sed "s/<APP_IP>/$(docker-machine ip cosmo)/" < $APP_DIR/server/conf/nginx-server-template.conf
      tail -n $(($(wc -l < $APP_DIR/.nginx.conf)-$COSMO_NGINX_CONF_END)) $APP_DIR/.nginx.conf
    } > /usr/local/etc/nginx/nginx.conf;
    rm $APP_DIR/.nginx.conf;

    # this sucks, but we have to ask for sudo
    sudo nginx -t && sudo nginx -s reload;

    if [ ! -f /usr/local/etc/nginx/nginx.conf ]; then
      error "nginx is not installed - run \"brew install nginx\"";
      exit 1;
    fi
  fi
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
    trap "kill ${PIDS[*]} && wait ${PIDS[*]} 2>/dev/null" SIGINT;
    wait;
  fi
fi
