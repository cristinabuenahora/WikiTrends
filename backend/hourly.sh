# Script that downloads the past hour of data, and redoes the analysis

# find the hour, an hour ago, seems to be london based?
hour=`date -d '6 hours ago' +%H`

year=`date +%Y`
month=`date +%m`
day=`date +%d`
fullfile="pageviews-2017"$month$day

# find the week in a long string of for loops
for d in "01" "02" "03" "04" "05" "06" "07"
do
if [ "$day" == "$d" ]; then
  week="1"
fi
done

for d in "08" "09" "10" "11" "12" "13" "14"
do
if [ "$day" == "$d" ]; then
  week="2"
fi
done

for d in "15" "16" "17" "18" "19" "20" "21"
do
if [ "$day" == "$d" ]; then
  week="3"
fi
done

for d in "21" "22" "23" "24" "25" "26" "27" "28" "29" "30" "31"
do
if [ "$day" == "$d" ]; then
  week="4"
fi
done

file=$fullfile"-"$hour"0000"
url="https://dumps.wikimedia.org/other/pageviews/"$year"/"$year"-"$month"/"$file".gz"
echo $url
wget $url -O "/nlp/data/sierray/pageviews/"$file".gz"
gunzip "/nlp/data/sierray/pageviews/"$file".gz"
grep ^en "/nlp/data/sierray/pageviews/"$file > "/nlp/data/sierray/"$month$week$year"/"$file
rm "/nlp/data/sierray/pageviews/"$file

python makeDict.py "/nlp/data/sierray/"$month$week$year > "/nlp/data/sierray/"$month$week$year"/countDict"
python spikeFinder.py "/nlp/data/sierray/"$month$week$year"/countDict" > "/nlp/data/sierray/"$month$week$year"/spikes"
echo "downloaded and analyzed an hour"


