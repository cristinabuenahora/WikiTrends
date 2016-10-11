#!/bin/bash

# cutoff = $1

# download file and sort it
curl -o pageviews-20161011-160000.z "https://dumps.wikimedia.org/other/pageviews/2016/2016-10/pageviews-20161011-160000.gz"
gunzip pageviews-20161011-160000.z
grep ^en pageviews-20161011-160000 > en.pagecounts
cut -f4 -d" " en.pagecounts | paste - en.pagecounts | sort -nr > en.pagecounts.sorted

# iterate through and eliminate pages with under # views
# while read line
# do 
#    echo "${line}"
# done <en.pagecounts.sorted
