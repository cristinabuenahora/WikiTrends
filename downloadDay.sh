#!/bin/bash
# Usage: bash downloadDay.sh 10 16
# arg 1 is the month
# arg 2 is the day
# arg 3 is the week 

fullfile="pageviews-2016"$1$2

#hours=("00" "01" "02" "03" "04" "05" "06" "07" "08" "09" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19" "20" "21" "22" "23")
hours=("08" "09" "10" "11")
for hour in ${hours[*]} 
do
  file=$fullfile"-"$hour"0000"
  url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1"/"$file.gz
  wget $url -O "/nlp/data/sierray/pageviews/"$file.gz
  gunzip "/nlp/data/sierray/pageviews/"$file.gz
  grep ^en "/nlp/data/sierray/pageviews/"$file > "/nlp/data/sierray/"$1$3"2016/"$file
  rm "/nlp/data/sierray/pageviews/"$file
done

