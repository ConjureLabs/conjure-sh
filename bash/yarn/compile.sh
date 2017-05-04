#! /bin/bash
### Called on `yarn run compile`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if ! hash webpack 2>/dev/null; then
  error "Could not run webpack - you may need to run 'yarn global add webpack'"
  exit 1;
fi

if [[ $* == *--watch* ]] || [ "$YARN_CONFIG_WATCH" == "true" ]; then
  announce "webpack watching for changes";
  webpack --config $APP_DIR/webpack.config.js --watch;
else
  progress "webpack building (one time)";
  webpack --config $APP_DIR/webpack.config.js;
fi
