# script that passes in two consecutive countdict files

month=$1
week=$2
year=$3
month2=$1

if [$week == "1"]; then
  week2=4
  month2=`date -d '1 month ago' +%m`
elif [$week == "2"]; then
  week2=1
elif [$week == "3"]; then
  week2=2
else
  week2=3
fi

if [$month2 == "12"]; then
  year2=`date -d '1 year ago' +%Y`
else
  year2=$year
fi

countDict1="data/"$month$week$year"/countDict"
countDict2="data/"$month2$week2$year2"/countDict"
datafile="../webapp/data/test.txt"

sort -k2 -n -r "data/"$month$week$year"/spikes" > "data/"$month$week$year"/topSpikes"
python addDate.py $month $week $month2 $week2 > $datafile 
python cleanSpikes.py "data/"$month$week$year"/topSpikes" $countDict1 $countDict2 >> $datafile 

