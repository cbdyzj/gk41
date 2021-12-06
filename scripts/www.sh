#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

if [ -f ../.profile ]; then
    . ../.profile
fi

cd ../www || exit 1

if [ ! -d node_modules ]; then
    npm i
fi

exec node ./src/main.js "$@"
