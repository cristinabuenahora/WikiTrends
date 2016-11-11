#!/bin/bash
# Usage: bash downloadDay.sh 10 16
# arg 1 is the month
# arg 2 is the day

fullfile="pageviews-2016"$1$2

# download 12:00AM file and get english pages
file=$fullfile-000000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1/$file.gz
wget $url -O "pageviews/"$file.gz
gunzip "pageviews/"$file.gz
grep ^en "pageviews/"$file > "enpageviews/"en.$file

# download 6:00AM file and get english pages
file=$fullfile-060000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1/$file.gz
wget $url -O "pageviews/"$file.gz 
gunzip "pageviews/"$file.gz
grep ^en "pageviews/"$file > "enpageviews/"en.$file


# download 12:00PM file and get english pages
file=$fullfile-120000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1/$file.gz
wget $url -O "pageviews/"$file.gz 
gunzip "pageviews/"$file.gz
grep ^en "pageviews/"$file > "enpageviews/"en.$file

# download 6:00PM file and get english pages
file=$fullfile-180000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-"$1/$file.gz
wget $url -O "pageviews/"$file.gz
gunzip "pageviews/"$file.gz
grep ^en "pageviews/"$file > "enpageviews/"en.$file

