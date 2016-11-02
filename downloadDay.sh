#!/bin/bash

# download file and get english pages
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$1.gz
curl -o $1.gz $url
gunzip $1.gz
grep ^en $1 > en.$1

# download file and get english pages
file=${1::19}060000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$file.gz
curl -o $file.gz $url
gunzip $file.gz
grep ^en $file > en.$file

# download file and get english pages
file=${1::19}120000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$file.gz
curl -o $file.gz $url
gunzip $file.gz
grep ^en $file > en.$file

# download file and get english pages
file=${1::19}180000
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$file.gz
curl -o $file.gz $url
gunzip $file.gz
grep ^en $file > en.$file