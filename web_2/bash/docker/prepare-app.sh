#! /bin/bash
# This is called when a Docker image is about to start running the app

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if [ ! -d "$APP_DIR/node_modules" ]; then
  # shouldn't happen
  error "modules missing - they should already be installed";
  exit 1;
else
  if [ ! -f /root/.npm-rebuilt ]; then
    progress "Rebuilding modules (this is slow)";
    npm rebuild;
    progress "Modules rebuilt";
    # rebuild only on first pass
    touch /root/.npm-rebuilt > /dev/null 2>&1;
  fi
fi