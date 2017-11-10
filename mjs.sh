#!/bin/bash

for (i in ls -R1G --ignore="*.ts" --ignore="*.cc" --ignore="*.hh" | grep ".js"
