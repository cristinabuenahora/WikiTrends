day=`date +%d`
monthdir="data/month"

# find the week and 3 weeks before in a long string of for loops
for d in "01" "02" "03" "04" "05" "06" "07"
do
if [ $day == $d ]; then
  week=1
  mkdir $monthdir
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

monthb=`date -d '1 month ago' +%m`
month=`date +%m`

if [ $week == 1 ]; then
  week2=4
  week3=3
  week4=2
  m2=$monthb
  m3=$monthb
  m4=$monthb
elif [ $week == 2 ]; then
  week2=1
  week3=4
  week4=3
  m2=$month
  m3=$monthb
  m4=$monthb
elif [ $week == 3 ]; then
  week2=2
  week3=1
  week4=4
  m2=$month
  m3=$month
  m4=$monthb
else
  week2=3
  week3=2
  week4=1
  m2=$month
  m3=$month
  m4=$month
fi
 
year=`date +%Y`
monthSpikes=$monthdir"/spikes"
monthtopspikes=$monthdir"/topSpikes"
datafile=$monthdir"/final"
wikifile=$monthdir"/wiki"

w1dir="data/"$month$week$year
w2dir="data/"$m2$week2$year
w3dir="data/"$m3$week3$year
w4dir="data/"$m4$week4$year

echo $w1dir
echo $w2dir
echo $w3dir
echo $w4dir

# create the monthly countDict
python makeMonthCountDict.py $w1dir"/countDict" $w2dir"/countDict" $w3dir"/countDict" $w4dir"/countDict" > $monthdir"/countDict" 

# put all week spikes in one file
cat $w1dir"/topSpikes" > $monthSpikes
cat $w2dir"/topSpikes" >> $monthSpikes
cat $w3dir"/topSpikes" >> $monthSpikes
cat $w4dir"/topSpikes" >> $monthSpikes

#sort the top spikes
sort -k2 -n -r $monthSpikes > $monthtopspikes

echo "preparing output file"
python addMonthDate.py $week4 $m4 $week3 $m3 $week2 $m2 $week $month > $datafile
python cleanMonthSpikes.py $monthtopspikes $monthdir"/countDict" >> $datafile

echo "scraping wiki"
python wikiscrape.py $datafile $wikifile

echo "getting categories"
python category.py $wikifile $datafile

cp $datafile "../webapp/data/month.txt"
