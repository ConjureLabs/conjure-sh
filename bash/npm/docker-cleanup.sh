#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/../functions.cfg;

docker rm -f $(docker ps -a -q);
docker rmi -f $(docker images -q);
