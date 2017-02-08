month=02
week=1
year=2017
month2=01
week2=4
year2=2017
countDict1="/nlp/data/sierray/"$month$week$year"/countDict"
countDict2="/nlp/data/sierray/"$month2$week2$year2"/countDict"
datafile="../webapp/data/test.txt"

sort -k2 -n -r "/nlp/data/sierray/"$month$week$year"/spikes" > "/nlp/data/sierray/"$month$week$year"/topSpikes"
python addDate.py $month $week $month2 $week2 > $datafile 
python cleanSpikes.py "/nlp/data/sierray/"$month$week$year"/topSpikes" $countDict1 $countDict2 >> $datafile 
git pull
git add ../webapp/data/test.txt
git commit -m "new data"
git push




