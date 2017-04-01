"""
Adds dates to the top of the final data file in month dir
arg1: month
"""
import sys
import os

def main():
  month = sys.argv[1]

  w1 = ["1","2","3","4","5","6","7"]
  w2 = ["8","9","10","11","12","13","14"]
  w3 = ["15","16","17","18","19","20","21"]
  w4a = ["22","23","24","25","26","27","28","29","30","31"]
  w4b = ["22","23","24","25","26","27","28","29","30"]
  w4c = ["22","23","24","25","26","27","28"]

  w = w1 + w2 + w3

  w4 = w4b
  if month in "01030507081012":
    w4 = w4a
  elif month == "02":
    w4 = w4c

  w = w + w4   

  s = "" 
  for d in w:
    s += month + "/" + d + " "

  print s

if __name__ == "__main__":
  main()
