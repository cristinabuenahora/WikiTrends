#!/bin/bash

# call downloadDay 
#bash downloadDay.sh $1
#arg=$1
#day=${arg:16:2}

#file=${arg:0:16}$day-000000
#echo $file

bash downloadDay.sh $1 01
bash downloadDay.sh $1 02
bash downloadDay.sh $1 03
bash downloadDay.sh $1 04
bash downloadDay.sh $1 05
bash downloadDay.sh $1 06
bash downloadDay.sh $1 07


