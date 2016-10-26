import sys
import csv


def main():
  f = open(sys.argv[1])
  output = open('output.csv', 'w+')
  headers = ['page', 'pageviews'] 
  writer = csv.DictWriter(output, fieldnames=headers)
  writer.writeheader()
  for line in f:
    s = line.split()
    if s[1][0] != '%' and ":" not in s[1]:
      writer.writerow({'page': s[1], 'pageviews': s[len(s) - 1]})
      #d[s[1]] = int(s[len(s) - 1])
      #headers.append(s[1])
  #print d
  #writer = csv.DictWriter(output, fieldnames=headers)
  #writer.writeheader()
  #writer.writerow(d)

if __name__ == '__main__':
  main()
