#! /bin/bash

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
. $BASE/vars.cfg;

# see http://stackoverflow.com/questions/407523/escape-a-string-for-a-sed-replace-pattern
TARGET_REPO=$(sed 's/[\/&]/\\&/g' <<< $1); # -e?
TARGET_BRANCH=$(sed 's/[\/&]/\\&/g' <<< $2);
CONTAINER_NAME=$(sed 's/[\/&]/\\&/g' <<< $3);
TARGET_SETUP=$(sed 's/[\/&]/\\&/g' <<< $4);
CACHEBUST=$(date +%s);

DOCKERFILE_CONTENT=$(cat "$PROJECT_DIR/template.Dockerfile");
DOCKERFILE_CONTENT=$(sed "s/<REPO>/$TARGET_REPO/g" <<< "$DOCKERFILE_CONTENT");
DOCKERFILE_CONTENT=$(sed "s/<BRANCH>/$TARGET_BRANCH/g" <<< "$DOCKERFILE_CONTENT");
DOCKERFILE_CONTENT=$(sed "s/<SETUP>/$TARGET_SETUP/g" <<< "$DOCKERFILE_CONTENT");
DOCKERFILE_CONTENT=$(sed "s/<CACHEBUST>/$CACHEBUST/g" <<< "$DOCKERFILE_CONTENT");

sed "s/<TEST>/$TARGET_TEST/g" <<< "$DOCKERFILE_CONTENT" > "$PROJECT_DIR/current.Dockerfile";

docker build -t "$CONTAINER_NAME:latest" -f "$PROJECT_DIR/current.Dockerfile" .;
