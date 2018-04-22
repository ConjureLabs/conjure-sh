#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

set -e

node $APP_DIR/scripts/stylus/prepare.js;
node $APP_DIR/scripts/config/generate-client-config.js;
