#!/bin/bash

# call downloadDay 

mkdir "/nlp/data/sierray/"$1"12016"
mkdir "/nlp/data/sierray/"$1"22016"
mkdir "/nlp/data/sierray/"$1"32016"
mkdir "/nlp/data/sierray/"$1"42016"

for day in "01" "02" "03" "04" "05" "06" "07" "08" "09"
do
  bash downloadDay.sh $1 $day 1
done

#for day in "08" "09" "10" "11" "12" "13" "14"
#do
#  bash downloadDay.sh $1 $day 2
#done

#for day in "15" "16" "17" "18" "19" "20" "21"
#do
#  bash downloadDay.sh $1 $day 1
#done

#for day in "22" "23" "24" "25" "26" "27" "28"
#do
#  bash downloadDay.sh $1 03 1
#done


#if [ "$1" != "02" ]; then
#  mkdir "data/"$1"5"
#  bash downloadDay.sh $1 29 5
#  bash downloadDay.sh $1 30 5
#fi

#if [ "$1" = "01" ] || [ "$1" = "03" ] || [ "$1" = "05" ] || [ "$2" = "07" ] || [ "$1" = "08" ] || [ "$1" = "10" ] || [ "$1" == "12" ]; then
#  bash downloadDay.sh $1 31 5 
#fi



