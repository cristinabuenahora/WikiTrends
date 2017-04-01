day=`date +%d`
monthdir="data/"$month$year

# find the week and week before in a long string of for loops
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

month=`date +%m`
year=`date +%Y`

weektopspikes=$month$week$year"/topSpikes"
monthSpikes=$monthdir"/spikes"
monthtopspikes=$monthdir"/topSpikes"
datafile=$monthdir"/final"

# append week spikes to month spikes
weektopspikes >> monthSpikes

sort -k2 -n -r $monthSpikes > $monthtopspikes

echo "preparing output file"
python addMonthDate.py $month > $datafile
python arrangeMonthSpikes.py $monthtopspikes $topSpikes1 $topSpikes2 $topSpikes3 $topSpikes4 >> $datafile

cp $datafile $frontendfile
