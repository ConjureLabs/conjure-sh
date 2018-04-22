#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e

source $APP_DIR/.profile;

node $APP_DIR/scripts/stylus/prepare.js --fresh --min;
node $APP_DIR/scripts/config/generate-client-config.js;
