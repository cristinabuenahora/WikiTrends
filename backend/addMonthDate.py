"""
Adds dates to the top of the final data file in month dir
arg1: week1
arg2: month1
...
week4
month4
"""
import sys
import os

def main():
  w1 = ["1","2","3","4","5","6","7"]
  w2 = ["8","9","10","11","12","13","14"]
  w3 = ["15","16","17","18","19","20","21"]
  w4a = ["22","23","24","25","26","27","28","29","30","31"]
  w4b = ["22","23","24","25","26","27","28","29","30"]
  w4c = ["22","23","24","25","26","27","28"]

  """
  w4 = w4b
  if month in "01030507081012":
    w4 = w4a
  elif month == "02":
    w4 = w4c
  """
  
  wmap = {"1":w1, "2":w2, "3":w3, "4":w4a}

  s = ""
  # print first week and month
  week = sys.argv[1]
  month = sys.argv[2]
  for d in wmap[week]:
    s += month + "/" + d + " "

  #print second 
  week = sys.argv[3]
  month = sys.argv[4]
  for d in wmap[week]:
    s += month + "/" + d + " "

  week = sys.argv[5]
  month = sys.argv[6]
  for d in wmap[week]:
    s += month + "/" + d + " "

  week = sys.argv[7]
  month = sys.argv[8]
  for d in wmap[week]:
    s += month + "/" + d + " "

  print s

if __name__ == "__main__":
  main()
