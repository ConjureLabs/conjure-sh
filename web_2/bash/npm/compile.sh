#! /bin/bash
### Called on `npm run-script compile`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if ! hash webpack 2>/dev/null; then
  error "Could not run webpack - you may need to run 'npm install webpack -g'"
  exit 1;
fi

if [[ $* == *--watch* ]] || [ "$npm_config_watch" == "true" ]; then
  webpack --config $APP_DIR/webpack.config.js --watch;
else
  webpack --config $APP_DIR/webpack.config.js;
fi
