#! /bin/bash
# Called on `npm start`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if [ "$CONTAINER" != "docker" ]; then
  if [ "$NODE_ENV" == "production" ]; then
    error "Production should not be run from outside of a deployed Docker image";
    exit 1;
  fi

  if [ "$NODE_ENV" != "production" ]; then
    # todo: fix this - it fails if the docker machine is not currently running
    eval "$(docker-machine env voyant)";

    if [ ! -f /usr/local/etc/nginx/nginx.conf ]; then
      error "nginx is not installed - run \"brew install nginx\"";
      exit 1;
    fi

    mkdir -p $CACHE_DIR/nginx;
    VOYANT_NGINX_CONF_NEEDED=1;
    VOYANT_NGINX_NEW_IP=$(docker-machine ip voyant);

    sudo nginx -s stop 2>/dev/null;

    if [ -f $CACHE_DIR/nginx/current-ip ]; then
      VOYANT_NGINX_CURRENT_IP=$(cat $CACHE_DIR/nginx/current-ip);
      if [ "$VOYANT_NGINX_NEW_IP" == "$VOYANT_NGINX_CURRENT_IP" ]; then
        VOYANT_NGINX_CONF_NEEDED=0;
      fi
    fi

    if [ $VOYANT_NGINX_CONF_NEEDED == 1 ]; then
      progress "Reconfiguring and restarting Nginx";

      # always backing up the nginx config
      cp /usr/local/etc/nginx/nginx.conf $CACHE_DIR/nginx/nginx.conf.bk

      VOYANT_NGINX_CONF_COUNT=$(cat /usr/local/etc/nginx/nginx.conf | grep "# < VOYANT CONF " | wc -l);
      if [ $VOYANT_NGINX_CONF_COUNT == 0 ]; then
        # config for this app has not yet been added to nginx
        # doing that now
        # this is assuming the last {} block of the nginx config is for http - may have to update this later
        sed '$s/\}/\
  # < VOYANT CONF START >\
  \
  # < VOYANT CONF END >\
  \
  }/' /usr/local/etc/nginx/nginx.conf > $CACHE_DIR/nginx/tmp.conf;
        mv $CACHE_DIR/nginx/tmp.conf /usr/local/etc/nginx/nginx.conf;
      fi

      echo $APP_IP;

      # find VOYANT CONF block, and replacing it with the new IP needed
      cp /usr/local/etc/nginx/nginx.conf $CACHE_DIR/nginx/tmp.conf;
      VOYANT_NGINX_CONF_START=$(grep -n '# < VOYANT CONF START >' $CACHE_DIR/nginx/tmp.conf | cut -d: -f 1);
      VOYANT_NGINX_CONF_END=$(grep -n '# < VOYANT CONF END >' $CACHE_DIR/nginx/tmp.conf | cut -d: -f 1);
      {
        head -n $(($VOYANT_NGINX_CONF_START-1)) $CACHE_DIR/nginx/tmp.conf
        sed "s/<APP_IP>/$VOYANT_NGINX_NEW_IP/" < $APP_DIR/server/conf/nginx-server-template.conf
        tail -n $(($(wc -l < $CACHE_DIR/nginx/tmp.conf)-$VOYANT_NGINX_CONF_END)) $CACHE_DIR/nginx/tmp.conf
      } > /usr/local/etc/nginx/nginx.conf;
      rm $CACHE_DIR/nginx/tmp.conf;

      # this sucks, but we have to ask for sudo
      sudo nginx -t;
      sudo nginx -s reload;
      sudo nginx;
    else
      # refresh nginx, refresh pid, etc
      sudo nginx;
    fi
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
    announce "App available at http://$APP_IP/ or http://localhost:3000/";
    tail -f $APP_DIR./webpack-build.log &
    PIDS[1]=$!;
    # by tracking pids, and using this trap, all tracked processes will be killed after a ^C
    # see http://stackoverflow.com/questions/9023164/in-bash-how-can-i-run-multiple-infinitely-running-commands-and-cancel-them-all
    trap "kill ${PIDS[*]} && wait ${PIDS[*]} 2>/dev/null" SIGINT;
    wait;
  fi
fi
