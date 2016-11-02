
import sys

def main():
  files = []
  for i in range(1,len(sys.argv)):
    files.append(sys.argv[i])
  

  dic = {}
  for f in files:
    diff = open(f)
    for line in diff:
      s = line.split('\t')
      page = s[1].strip()
      count = s[0].strip()
      if page[0] != '\\':
        if page in dic:
          dic[page].append(count)
        else:
          dic[page] = [count]
  
  for page in dic:
    count = 0
    for num in dic[page]:
      count += int(num)
    print str(count) + '\t' + page


if __name__ == '__main__':
  main()
