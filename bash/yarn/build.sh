#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

source $BASH_DIR/apply-profile.sh;

node $APP_DIR/scripts/stylus/prepare.js;
node $APP_DIR/scripts/config/generate-client-config.js;

next build;
