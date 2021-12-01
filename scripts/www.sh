#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

if [ -f .env ]; then
    . ./.env
fi

cd ../www || exit 1

if [ ! -d node_modules ]; then
    npm i
fi

node ./src/main.js "$@"