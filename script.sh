#!/bin/bash

# cutoff = $1

# download file and sort it
#curl -o pagecounts-20160801-000000.gz "https://dumps.wikimedia.org/other/pagecounts-raw/2016/2016-08/pagecounts-20160801-000000.gz"
#gunzip pagecounts-20160801-000000.gz
#grep ^en pagecounts-20160801-000000 > en.pagecounts
#cut -f4 -d" " en.pagecounts | paste - en.pagecounts | sort -nr > en.pagecounts.sorted

# iterate through and eliminate pages with under # views
while read line
do 
    echo "${line}"
done <en.pagecounts.sorted
