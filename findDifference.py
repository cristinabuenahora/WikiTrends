
import sys

def main():
  f1 = open(sys.argv[1])
  f2 = open(sys.argv[2])
  f1counts = {}
  diffs = {}
  for line in f1:
    splits = line.split()
    title = splits[1]
    views = splits[2]
    f1counts[title] = views
  for line in f2:
    splits = line.split()
    title = splits[1]
    views = splits[2]
    if title in f1counts:
      diffs[title] = int(views) - int(f1counts[title])
    else:
      diffs[title] = int(views)
  for title in diffs:
    if abs(diffs[title]) > 20:
      print str(diffs[title]) + '\t' + title


if __name__ == '__main__':
  main()
