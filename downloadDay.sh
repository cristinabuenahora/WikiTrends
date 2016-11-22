#!/bin/bash
# Usage: bash downloadDay.sh 10 16
# arg 1 is the month
# arg 2 is the day
# arg 3 is the week 

fullfile="pageviews-2016"$1$2

hours=("00" "01" "02" "03" "04" "05" "06" "07" "12" "13" "14" "15" "16" "17" "18" "19" "20" "21" "22" "23")

for hour in ${hours[*]} 
do
  file=$fullfile"-"$hour"0000"
  url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1/$file.gz
  wget $url -O "pageviews/"$file.gz
  gunzip "pageviews/"$file.gz
  grep ^en "pageviews/"$file > "data/"$1$3"/"$file
  rm "pageviews/"$file
done

