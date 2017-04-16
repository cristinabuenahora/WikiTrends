"""
Python script that updates the countDict of a day with the page counts from this hour

arguments
1: location of day count file
2: location of hour count file to incorporate
3: whether this is a new day or not
"""

import sys

def new_day(pagecount):
	count_dict = {}
	for page in pagecount:
		splits = page.split("\t")
		if len(splits) < 2:
			continue
		pagename = splits[0]
		hour_count = splits[1]
		countDict[pagename] = hour_count	
	return count_dict


def old_day(hour_counts, countDict_file):
	# read countDict_file into dictionary
	count_dict = {}
	for line in countDict_file:
    s = line.split('\t')
    if len(s) > 1:
      count_dict[s[0]] = s[1]
      max_counts = len(s[1].split())

	# update the counts with hourly counts
  for page in hour_count:
    splits = page.split('\t')
    if len(splits) < 2:
      continue
    pagename = splits[0]
    hour_count = splits[1]
    seen = False
 
    if dict_pagename in count_dict:
      count_dict[dict_pagename] = str(int(count_dict[dict_pagename]) + int(hour_count)) 
	return count_dict
 

def main():  
  day_count_file = open(sys.argv[1], "r")
  hour_counts = open(sys.argv[2])

  count_dict = {}
	if (sys.argv[3] == "1"):
		count_dict = new_day(hour_counts)
	else: 
		count_dict = old_day(hour_counts, day_count_file)          
 
  # read back into countDict file
  hour_count_file.close()
  f = open(sys.argv[1], "w")
  for page in count_dict:
    x = 0
    f.write(page + "\t" + count_dict[page])

if __name__ == '__main__':
  main()
