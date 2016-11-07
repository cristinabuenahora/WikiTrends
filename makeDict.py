
import sys
import os

'''
Creates a dictionary of pagename '\t' count1 count2 count3 from the data in enpageviews directory
'''

def main():
 
  d = {}
  for filename in os.listdir('enpageviews'):
    f = open('enpageviews/' + filename)
    seen = {}
    for line in f:
      splits = line.split()
      title = splits[1].strip()
      views = splits[2].strip()
      if title not in d:
        d[title] = []
      if title not in seen:
        d[title].append(views)
        seen[title] = True
      else:
        l = len(d[title]) - 1
        currCount = d[title][l]
        d[title][l] = str(int(currCount) + int(views))
 
  s = ''
  for title in d:
    s += title + '\t'
    for count in d[title]:
      s += count + ' '
    s += '\n'
  
  print s



if __name__ == '__main__':
  main()
