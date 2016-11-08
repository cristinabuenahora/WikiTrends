# WikiTrends

Upenn ESE Senior Design Project

Members: Abhiti Prabakhar, Cristina Buenahora, Alice Serfati, Sierra Yit

Advisor: Professor Chris Callison-Burch

Goal: Find and analyse spikes in Wikipedia page count data to create a completely unbiased news source across different languages.

WebApp:
To run webapp on localhost8080: node app.js
- Make sure node and express are installed

Process:
1. Use dictMaker.py to create a file with pagename '\t' count1 count2 ..... 
2. Use spikeFinder.py to find spikes in the dictMaker output

Done:
Backend
- Script to find the views everyday for a whole month
- Working on script to find the spikes for the month
