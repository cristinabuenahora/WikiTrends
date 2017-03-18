"""
Python script that updates the countDict of a week with the page counts from this hour

arguments
1: location of countDict file
2: location of pagecount file to incorporate
3: whether this is a new day or not
"""

import sys

def main():
  countDict_file = open(sys.argv[1])
  pagecount = open(sys.argv[2])
  
  # read countDict into a dictionary
  countDict = {}
  for line in countDict_file:
    s = line.split('\t')
    if len(s) > 1:
      countDict[s[0]] = s[1]

  # for each entry in the pagecount file, see if it's in countDict
  for page in pagecount:
    splits = page.split('\t')
    if len(splits) > 1:
      pagename = splits[0]
      hour_count = splits[1]
      seen = False
      for dict_pagename in countDict:
        if dict_pagename == pagename:
          if sys.argv[3] == "1":
            countDict[dict_pagename] += " " + hour_count
            seen = True
            break
          else:
            numbers = countDict[dict_pagename]
            numbers_list = numbers.split()
            last_number = int(numbers_list[len(numbers_list)])
            last_number += hour_count
            numbers_list[len(numbers_list)] = str(last_number)
            numbers = numbers_list.join(" ")
            countDict[dict_pagename] = numbers
            seen = True
            break
      # add page to countDict with right amount of days before :/
      if not seen:
        countDict[pagename] = hour_count
  
            
  # read back into countDict file
  c = ""
  for page in countDict:
    c += page + "\t" + countDict[page]
  print c
           

if __name__ == '__main__':
  main()
