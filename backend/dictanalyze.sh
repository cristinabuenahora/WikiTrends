
month="02"
year="2017"

weeks=("1" "2" "3" "4")
for week in ${weeks[*]}
do
  file="/nlp/data/sierray/"$month$week$year
  python makeDict.py $file > $file"/countDict"
  python spikeFinder.py $file"/countDict" > $file"/spikes"
  sort -k2 -n -r $file"/spikes" > $file"/topSpikes"
done

