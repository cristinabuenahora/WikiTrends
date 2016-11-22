#!/bin/bash
# Usage: bash downloadDay.sh 10 16
# arg 1 is the month
# arg 2 is the day
# arg 3 is the week 

fullfile="pageviews-2016"$1$2

for hour in "000000" "060000" "120000" "180000"
do
  file=$fullfile"-"$hour
  url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1/$file.gz
  wget $url -O "pageviews/"$file.gz
  gunzip "pageviews/"$file.gz
  grep ^en "pageviews/"$file > "data/"$1$3"/"$file
  rm "pageviews/"$file
done

