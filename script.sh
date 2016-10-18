#!/bin/bash

# cutoff = $1

# download file and sort it
curl -o pagecounts-20160701-000000.gz "https://dumps.wikimedia.org/other/pagecounts-raw/2016/2016-07/pagecounts-20160701-000000.gz"
gunzip pagecounts-20160701-000000.gz
grep ^en pagecounts-20160701-000000 > en.pagecounts1
cut -f4 -d" " en.pagecounts1 | paste - en.pagecounts1 | sort -nr > en.pagecounts.sorted1

# download file and sort it
curl -o pagecounts-20160716-000000.gz "https://dumps.wikimedia.org/other/pagecounts-raw/2016/2016-07/pagecounts-20160716-000000.gz"
gunzip pagecounts-20160716-000000.gz
grep ^en pagecounts-20160716-000000 > en.pagecounts2
cut -f4 -d" " en.pagecounts2 | paste - en.pagecounts2 | sort -nr > en.pagecounts.sorted2
