#!/bin/bash

# download 12:00AM file and get english pages
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$1.gz
curl -o $1.gz $url
gunzip $1.gz
grep ^en $1 > en.$1

# download 6:00AM file and get english pages
file=${1::19}060000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$file.gz
curl -o $file.gz $url
gunzip $file.gz
grep ^en $file > en.$file

# download 12:00PM file and get english pages
file=${1::19}120000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$file.gz
curl -o $file.gz $url
gunzip $file.gz
grep ^en $file > en.$file

# download 6:00PM file and get english pages
file=${1::19}180000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$file.gz
curl -o $file.gz $url
gunzip $file.gz
grep ^en $file > en.$file
