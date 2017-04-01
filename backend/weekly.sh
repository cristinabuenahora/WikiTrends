day=`date +%d`


# find the week and week before in a long string of for loops
for d in "01" "02" "03" "04" "05" "06" "07"
do
if [ $day == $d ]; then
  week=1
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
monthb=$month
year=`date +%Y`
yearb=$year

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

cp data/$monthb$weekb$yearb/final ../webapp/data/week.txt
