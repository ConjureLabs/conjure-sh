#! /bin/bash
### Called on `yarn run lint`

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

if ! hash jscs 2>/dev/null; then
  error "Could not run jscs - you may need to run 'yarn global add jscs'";
  exit 1;
fi

if ! hash eslint 2>/dev/null; then
  error "Could not run eslint - you may need to run 'yarn global add eslint'";
  exit 1;
fi

# todo: fix global check, with yarn ('yarn global ls' is not working)
# BABEL_LINT=$(yarn list -g | grep babel-eslint | wc -l);

# if [ $BABEL_LINT -eq 0 ]; then
#   error "eslint is installed, but babel support is not - you may need to run 'yarn global add babel-eslint'";
#   exit 1;
# fi

set -e;

eslint ./**/*.js;
jscs ./**/*.js;

progress "Lint passed";
