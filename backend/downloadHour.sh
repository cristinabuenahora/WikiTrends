
hour=$1
day=$2
week=$3
month=$4
year=$5

#download the file
file="pageviews-2017"$month$day"-"$hour"0000"
url="https://dumps.wikimedia.org/other/pageviews/"$year"/"$year"-"$month"/"$file".gz"
wget $url -O "zipped/"$file".gz"

# unzip file
gunzip "zipped/"$file".gz"
mkdir data/$month$week$year
# look for the english entries
grep ^en "zipped/"$file > "data/"$month$week$year"/"$file

# remove extra files
rm "zipped/"$file
