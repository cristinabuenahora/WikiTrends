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
  month1 = sys.argv[3]
  week1 = sys.argv[4]

  w1 = ["1","2","3","4","5","6","7"]
  w2 = ["8","9","10","11","12","13","14"]
  w3 = ["15","16","17","18","19","20","21"]
  w4 = ["22","23","24","25","26","27","28","29","30","31"]

  if week1 == "1":
    w = w1
  if week1 == "2":
    w = w2
  if week1 == "3":
    w = w3
  if week1 == "4":
    w = w4

  s = ""
  for d in w:
    s += month1 + "/" + d + " "

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
