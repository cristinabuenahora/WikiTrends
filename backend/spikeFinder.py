
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
  #filename='/nlp/data/sierray/' + sys.argv[2]
  f1 = open(sys.argv[1])
  f2 = open(sys.argv[2])
  
  # first create a dictionary of page names to views
  d = {}
  for line in f2:
    t = line.split('\t')
    if (len(t) > 1):
      d[t[0]] = t[1].split('\n')[0]
  for line in f1:
    t = line.split('\t')
    if (len(t) > 1):
      if t[0] in d:
        d[t[0]] += t[1]
      else:
        d[t[0]] = "0 0 0 0 0 0 0" + t[1]
  
  for line in d:
    l = len(d[line].split())
    if l < 14:
      d[line] = d[line].split('\n')[0]
      for i in range(0,14-l):
        d[line] += " 0"
      d[line] += "\n"
 
  for page in d:
    counts = d[page].split()
    # average the first half of the list
    avg1 = 0
    idx = int(math.floor(len(counts) * (1.0/2)))
    for i in range(0, idx):
      avg1 += int(counts[i])
    avg1 = avg1/idx
  
    # average the last third of the list
    avg2 = 0
    for i in range(idx, len(counts)):
      avg2 += int(counts[i])
    avg2 = avg2/(len(counts) - idx)
      
    # check if the difference is above a certain percent change and actual value
    diff = avg2 - avg1
    if (diff > 800 and avg2 > 5*avg1):
      # if it is then print the name and the difference
      print page + '\t' + str(diff)

if __name__ == '__main__':
  main()
