#!/bin/bash

if [[ "${1}" == "mjs" ]]; then
    for file in $(find "./src" | grep ".js$"); do #all .js files
        mv ${file} ${file: 0 : -2}mjs
    done
elif [[ "${1}" == "clean" ]]; then
    for file in $(find "./src" | grep ".js$"); do
        rm ${file}
    done
elif [[ "${1}" == "run" ]]; then
    node --ex
else
    tsc
fi