#!/bin/bash

# call downloadDay 

mkdir "data/"$1"1"
mkdir "data/"$1"2"
mkdir "data/"$1"3"
mkdir "data/"$1"4"
bash downloadDay.sh $1 01 1
bash downloadDay.sh $1 02 1
bash downloadDay.sh $1 03 1
bash downloadDay.sh $1 04 1
bash downloadDay.sh $1 05 1
bash downloadDay.sh $1 06 1
bash downloadDay.sh $1 07 1

bash downloadDay.sh $1 08 2
bash downloadDay.sh $1 09 2
bash downloadDay.sh $1 10 2
bash downloadDay.sh $1 11 2
bash downloadDay.sh $1 12 2
bash downloadDay.sh $1 13 2
bash downloadDay.sh $1 14 2

bash downloadDay.sh $1 15 3
bash downloadDay.sh $1 16 3
bash downloadDay.sh $1 17 3
bash downloadDay.sh $1 18 3
bash downloadDay.sh $1 19 3
bash downloadDay.sh $1 20 3
bash downloadDay.sh $1 21 3

bash downloadDay.sh $1 22 4
bash downloadDay.sh $1 23 4
bash downloadDay.sh $1 24 4
bash downloadDay.sh $1 25 4
bash downloadDay.sh $1 26 4
bash downloadDay.sh $1 27 4
bash downloadDay.sh $1 28 4

if [ "$1" != "02" ]; then
  mkdir "data/"$1"5"
  bash downloadDay.sh $1 29 5
  bash downloadDay.sh $1 30 5
fi

if [ "$1" = "01" ] || [ "$1" = "03" ] || [ "$1" = "05" ] || [ "$2" = "07" ] || [ "$1" = "08" ] || [ "$1" = "10" ] || [ "$1" == "12" ]; then
  bash downloadDay.sh $1 31 5 
fi



