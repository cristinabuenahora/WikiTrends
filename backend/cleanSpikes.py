import sys
import os

'''
Filters out the spammy spikes, adds them to a list of files with the page counts for the last week
arg1 : file of topSpikes, format title tab count
arg2 : file of countDict from this week
arg3 : file of countDict from previous week
'''

f = open(sys.argv[1])
spikes = {}
numSpikes = 0

# iterates through topSpikes filters out bad ones
for line in f:
  splits = line.split()
  title = splits[0]
  count = splits[1]
  delete = False
  try:
    if title == "Main_Page":
      delete = True
    if "Special:" in title:
      delete = True
    if not delete:
      spikes[title] = count
      numSpikes += 1 
    if numSpikes > 15:
      break
  except:
    x = 1

s = ""
countDict1 = open(sys.argv[3])
countDict = open(sys.argv[2])


for line in countDict1:
  splits = line.split("\t")
  try:
    t = splits[0]
    counts = splits[1]
    if t in spikes:
      spikes[t] = counts
  except:
    x = 1
  
for line in countDict:
  splits = line.split("\t")
  try:
    t = splits[0]
    counts = splits[1]
    if t in spikes:
      spikes[t] += " " + counts
  except:
    x = 1

acc = ""
for s in spikes:
  acc += s + "\t" + spikes[s]

print acc

