#!/bin/bash

# call downloadDay 
#bash downloadDay.sh $1
arg=$1
day=${arg:16:2}

file=${arg:0:16}$day-000000
echo $file
