# Script that downloads the past hour of data, and redoes the analysis

# find the hour, an hour ago, seems to be london based?
hour=`date -d '4 hours ago' +%H`
day=`date +%d`
month=`date +%m`
monthb=$month
#day=28
#month=03
#monthb=02
year=`date +%Y`

echo "hour:"$hour" day:"$day" month:"$month

# find the week and week before in a long string of for loops
for d in "01" "02" "03" "04" "05" "06" "07"
do
if [ $day == $d ]; then
  week=1
  mkdir data/$month$week$year
fi
done

for d in "08" "09" "10" "11" "12" "13" "14"
do
if [ $day == $d ]; then
  week=2
fi
done

for d in "15" "16" "17" "18" "19" "20" "21"
do
if [ $day == $d ]; then
  week=3
fi
done

for d in "21" "22" "23" "24" "25" "26" "27" "28" "29" "30" "31"
do
if [ $day == $d ]; then
  week=4
fi
done

if [ $week == 1 ]; then
  weekb=4
  monthb=`date -d '1 month ago' +%m`
elif [ $week == 2 ]; then
  weekb=1
elif [ $week == 3 ]; then
  weekb=2
else
  weekb=3
fi

if [ $monthb == 12 ]; then
  yearb=`date -d '1 year ago' +%Y`
else
  yearb=$year
fi


bash downloadHour.sh $hour $day $week $month $year

echo "downloaded an hour"

dataDir="data/"$month$week$year
resultsDir="data/"$month$week$year
countDict1=$resultsDir"/countDict"
countDict2="data/"$monthb$weekb$yearb"/countDict"
spikes=$resultsDir"/spikes"
topSpikes=$resultsDir"/topSpikes"
frontendfile="../webapp/data/now.txt"
datafile="data/"$month$week$year"/final"
wikifile="data/"$month$week$year"/wiki"
categoriesfile="data/"$month$week$year"/categories"
pageviewfile=$resultsDir"/pageviews-"$year$month$day"-"$hour"0000"

makeCountDict=0

# figure out if this is a new week
if [ $day == 01 ] || [ $day == 07 ] || [ $day == 14 ] || [ $day == 21 ] || [ $makeCountDict == 1 ];then
  if [ $hour == 00 ] || [ $makeCountDict == 1 ]; then
    echo "making countDict file"
    mkdir "data/"$month$week$year
    python makeDict.py $dataDir > $countDict1
  fi
else
  new_day=0
  if [ $hour == 00 ]; then
    new_day=1
  fi
  echo "updating counts"
  echo $countDict1
  python updateCounts.py $countDict1 $pageviewfile $new_day
fi

rm $pageviewfile

echo "finding spikes"
python spikeFinder.py $countDict1 $countDict2 > $spikes

sort -k2 -n -r $spikes > $topSpikes

echo "preparing output file"
python addDate.py $month $week $monthb $weekb > $datafile
python cleanSpikes.py $topSpikes $countDict1 $countDict2 >> $datafile

echo "scraping wiki"
python wikiscrape.py $datafile $wikifile $categoriesfile

cp $wikifile $frontendfile

echo "finished"
