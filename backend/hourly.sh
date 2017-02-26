# Script that downloads the past hour of data, and redoes the analysis

# find the hour, an hour ago, seems to be london based?
hour=`date -d '7 hours ago' +%H`
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

#download the file
file=$fullfile"-"$hour"0000"
url="https://dumps.wikimedia.org/other/pageviews/"$year"/"$year"-"$month"/"$file".gz"
echo $url
wget $url -O "zipped/"$file".gz"

# unzip file
gunzip "zipped/"$file".gz"
mkdir data/$month$week$year
# look for the english entries
grep ^en "zipped/"$file > "data/"$month$week$year"/"$file

# remove extra files
rm "zipped/"$file

# make file of dictionary
python makeDict.py "data/"$month$week$year > "data/"$month$week$year"/countDict"
# analyse the spikes
python spikeFinder.py "data/"$month$week$year"/countDict" > "data/"$month$week$year"/spikes"

# clean the spikes
monthb=$month
if [$week == "1"]; then
  weekb=4
  monthb=`date -d '1 month ago' +%m`
elif [$week == "2"]; then
  weekb=1
elif [$week == "3"]; then
  weekb=2
else
  weekb=3
fi

if [$monthb == "12"]; then
  yearb=`date -d '1 year ago' +%Y`
else
  yearb=$year
fi

countDict1="data/"$month$week$year"/countDict"
countDict2="data/"$monthb$weekb$yearb"/countDict"
datafile="../webapp/data/test.txt"

sort -k2 -n -r "data/"$month$week$year"/spikes" > "data/"$month$week$year"/topSpikes"
echo $month
python addDate.py $month $week $monthb $weekb > $datafile
python cleanSpikes.py "data/"$month$week$year"/topSpikes" $countDict1 $countDict2 >> $datafile

echo "downloaded and analyzed an hour"


