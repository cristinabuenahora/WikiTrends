
import sys
import math

'''
takes in makeDict.py data of 
pagename  day1 day2 day3
'''

def main():
  f = open(sys.argv[1])
  for line in f:
    # put the dayviews in a list
    tab = line.split('\t')
    pagename = tab[0]
    if (len(tab) > 1):
      counts = tab[1].split()
      if (len(counts) > 3):
        
        # average the first two thirds of the list
        avg1 = 0
        idx = int(math.floor(len(counts) * (2.0/3)))
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
        if (diff > avg1 * 1.5 and diff > 500):
          # if it is then print the name and the difference
          print pagename + '\t' + str(diff)

if __name__ == '__main__':
  main()
