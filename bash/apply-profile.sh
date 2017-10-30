#! /bin/bash

if [ ! $CONJURE_PROFILE_PATH = "" ]; then
  source "$CONJURE_PROFILE_PATH";
else
  source $APP_DIR/../conjure-core/.profile;
fi
