"""
Python script that updates the countDict of a week with the page counts from this hour

arguments
1: location of countDict file
2: location of pagecount file to incorporate
3: whether this is a new day or not
"""

import sys

def main():
  countDict_file = open(sys.argv[1], "r")
  pagecount = open(sys.argv[2])
  
  # read countDict into a dictionary
  countDict = {}
  for line in countDict_file:
    s = line.split('\t')
    if len(s) > 1:
      countDict[s[0]] = s[1]
      max_counts = len(s[1].split())


  # for each entry in the pagecount file, see if it's in countDict
  for page in pagecount:
    splits = page.split('\t')
    if len(splits) < 2:
      continue
    pagename = splits[0]
    hour_count = splits[1]
    seen = False
 
    if dict_pagename in countDict:
      countDict[dict_pagename] = countDict[dict_pagename].split('\n')[0]
      # if its a new day, just add to countDict counts
      if sys.argv[3] == "1":
        countDict[dict_pagename] += " " + hour_count
      # if its not a new day, add this to the last count
      else:
        counts = countDict[dict_pagename].split()
        counts[len(counts)] = str(int(counts[len(counts)]) + str(hour_count))
        countDict[dict_pagename] = counts.join(" ")
      countDict[dict_pagename] += '\n'
    # add page to countDict with right amount of days before :/
    else: 
      countDict[pagename] = "0"
      for i in range(2, max_counts):
        countDict += ' 0'
      if sys.argv[3] == "1":
        countDict[pagename] += " 0 "
      countDict[pagename] += " " + hour_count
            
  # read back into countDict file
  countDict_file.close()
  f = open(sys.argv[1], "w")
  for page in countDict:
    x = 0
    f.write(page + "\t" + countDict[page])


if __name__ == '__main__':
  main()
