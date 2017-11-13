#!/bin/bash

function mjs() {
    for file in $(find "./src" | grep ".js$"); do #all .js files
            mv ${file} ${file: 0 : -2}mjs
    done
}

if [[ "${1}" == "mjs" ]]; then
    mjs
elif [[ "${1}" == "clean" ]]; then
    for file in $(find "./src" | grep ".mjs$"); do
        rm ${file}
    done
elif [[ "${1}" == "run" ]]; then
    node --experimental-modules src/bot.mjs
elif [[ "${1}" == "build" ]]; then
    tsc
    mjs
else
    tsc
fi

