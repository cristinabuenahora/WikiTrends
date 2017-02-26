"""
Adds dates to the top of the test.txt data file in webapp
arg1: month
arg2: day
"""
import sys
import os

def main():
  month = sys.argv[1]
  week = sys.argv[2]
  monthb = sys.argv[3]
  weekb = sys.argv[4]

  w1 = ["1","2","3","4","5","6","7"]
  w2 = ["8","9","10","11","12","13","14"]
  w3 = ["15","16","17","18","19","20","21"]
  w4 = ["22","23","24","25","26","27","28","29","30","31"]

  if weekb == "1":
    w = w1
  if weekb == "2":
    w = w2
  if weekb == "3":
    w = w3
  if weekb == "4":
    w = w4

  s = ""
  for d in w:
    s += monthb + "/" + d + " "

  if week == "1":
    w = w1
  if week == "2":
    w = w2
  if week == "3":
    w = w3
  if week == "4":
    w = w4
  
  for d in w:
    s += month + "/" + d + " "

  print s

if __name__ == "__main__":
  main()
