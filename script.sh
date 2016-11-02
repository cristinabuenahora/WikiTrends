#!/bin/bash

# cutoff = $1

# download file and sort it
url="https://dumps.wikimedia.org/other/pageviews/2016/2016-10/"$1.gz
echo $1
echo $url

curl -o $1.gz $url
gunzip $1.gz
grep ^en $1 > en.pagecounts1
#cut -f4 -d" " en.pagecounts1 | paste - en.pagecounts1 | sort -nr > en.pagecounts.sorted1
