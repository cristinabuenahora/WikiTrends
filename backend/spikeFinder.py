
import sys
import math

'''
takes in makeDict.py data of 
pagename  day1 day2 day3
as first argument

second arg is second count dict
third argument is the day you're looking for
'''

def main():
  '''
  This should take in the last two weeks of averaged data, and compare to the current day
  '''
  f1 = open(sys.argv[1])
  f2 = open(sys.argv[2])
  
  # first create a dictionary of page names to views
  d = {}
  # add first countDict
  for line in f2:
    t = line.split('\t')
    if (len(t) > 1):
      d[t[0]] = t[1].split('\n')[0]
  max_f1=0
  # add second countDict
  for line in f1:
    t = line.split('\t')
    if (len(t) > 1):
      max_f1 = len(t[1].split())
      if t[0] in d:
        d[t[0]] += t[1]
      else:
        d[t[0]] = "0 0 0 0 0 0 0" + t[1]
 
  # pad with any missing 0s 
  for line in d:
    l = len(d[line].split())
    if l < 7 + max_f1:
      d[line] = d[line].split('\n')[0]
      for i in range(0,max_f1-l):
        d[line] += "0 "
      d[line] += "\n"

  # go through d to find spikes 
  for page in d:
    counts = d[page].split()
    if len(counts) < 7:
	continue
	
    # average the first two thirds of two weeks 
    avg1 = 0
    idx = int(math.floor(len(counts) * (2.0/3)))
    for i in range(0, idx):
      avg1 += int(counts[i])
    avg1 = avg1/idx
  
    # average the last third of the two weeks
    avg2 = 0
    for i in range(idx, len(counts)):
      avg2 += int(counts[i])
    avg2 = avg2/(len(counts) - idx)

    # average the first 0-(len -4)
    small_avg1 = 0
    idx = len(counts) - 4
    for i in range(0, idx):
      small_avg1 += int(counts[i])
    small_avg1 = small_avg1/idx

    # average the last 3-0 days
    small_avg2 = 0
    for i in range(idx, len(counts)):
      small_avg2 += int(counts[i])
    small_avg2 = small_avg2/(len(counts)-idx)      

    # check if the difference is above a certain percent change and actual value
    diff = avg2 - avg1
    small_diff = small_avg2 - small_avg1
    big_page_spikes = avg1 > 100000 and avg2 > 2*avg1
    small_page_spikes = diff > 10000 and avg1 > 500
    tall_spike = avg2 > 5*avg1
    small_avg_spike = small_avg2 > 3*small_avg1
    if ((big_page_spikes or small_page_spikes or tall_spike or small_avg_spike) and diff > 2000):
      # if it is then print the name and the difference
      print page + '\t' + str(diff) + '\t' + str(small_diff)

if __name__ == '__main__':
  main()
