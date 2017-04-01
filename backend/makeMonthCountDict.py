
import sys

"""
adds all countDicts together
arg1: cd1
arg2: cd2
arg3: cd3
arg4: cd4
"""

def main():
  cd1 = open(sys.argv[1])
  cd2 = open(sys.argv[2])
  cd3 = open(sys.argv[3])
  cd4 = open(sys.argv[4])

  d={}
  # put cd1 into dictionary
  for line in cd1:
    s = line.split('\t')
    if len(s) > 1:
      d[s[0]] = s[1]
  
  for line in cd2:
    s = line.split('\t')
    if len(s) > 1:
      if s[0] in d:
        d[s[0]] = d[s[0]].split('\n')[0] + s[1]
      else:
        d[s[0]] = "0 0 0 0 0 0 0 " + s[1]
    
  for line in cd3:
    s = line.split('\t')
    if len(s) > 1:
      if s[0] in d:
        if len(s[1].split()) < 14:
          d[s[0]] = d[s[0]].split('\n')[0] + "0 0 0 0 0 0 0 "
        d[s[0]] = d[s[0]].split('\n')[0] + s[1]
      else:
        d[s[0]] = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 " + s[1]
  
  for line in cd4:
    s = line.split('\t')
    if len(s) > 1:
      if s[0] in d:
        if len(s[1].split()) < 14:
          d[s[0]] = d[s[0]].split('\n')[0] + "0 0 0 0 0 0 0 0 0 0 0 0 0 0" 
        d[s[0]] = d[s[0]].split('\n')[0] + s[1]
      else:
        d[s[0]] = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " + s[1]

  # check if any page has less than the proper amount of days
  for e in d:
    days = len(d[e].split())
    if days < 14:
      d[e] = d[e].split('\n')[0] + "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n"    
    elif days < 21:
      d[e] = d[e].split('\n')[0] + "0 0 0 0 0 0 0 0 0 0 0 0 0 0\n"
    elif days < 31:
      d[e] = d[e].split('\n')[0] + "0 0 0 0 0 0 0\n"
    else:
      x = 0 

  s = ""
  for e in d:
    s += e + '\t' + d[e]

  print s


if __name__ == '__main__':
  main()
