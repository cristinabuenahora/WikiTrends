#!/bin/bash

month=02
#mkdir "/nlp/data/sierray/"$month"12017"
mkdir "/nlp/data/sierray/"$month"22017"
mkdir "/nlp/data/sierray/"$month"32017"
mkdir "/nlp/data/sierray/"$month"42017"


#for day in "01" "02" "03" "04" "05" "06" "07" 
#do
#  bash downloadDay.sh $month $day 1
#done

for day in "08" "09" "10" "11" "12" "13" "14"
do
  bash downloadDay.sh $month $day 2
done

for day in "15" "16" "17" "18" "19" "20" "21"
do
  bash downloadDay.sh $month $day 3
done

for day in "22" "23" "24" "25" "26" "27" "28"
do
  bash downloadDay.sh $month $day 4
done


if [ "$month" != "02" ]; then
  mkdir "data/"$month"5"
  bash downloadDay.sh $month 29 5
  bash downloadDay.sh $month 30 5
fi

if [ "$month" = "01" ] || [ "$month" = "03" ] || [ "$month" = "05" ] || [ "$month" = "07" ] || [ "$month" = "08" ] || [ "$month" = "10" ] || [ "$month" == "12" ]; then
  bash downloadDay.sh $month 31 5 
fi



