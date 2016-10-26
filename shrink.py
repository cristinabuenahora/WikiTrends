def main():
	f1 = open(sys.argv[1])
	f2 = open(sys.argv[2])
	for line1, line2 in zip(f1, f2):
		s1 = line1.split()
		s2 = line2.split()
		count1 = int(s1[len(s1)-1])
		count2 = int(s2[len(s1)-1])
		dif = abs(count1 - count2)
		if (count1 > 10000 or count2 > 10000 or dif > 500):`
			print "%d, %d, %d, %s" % (count1, count2, dif, s1[1])

	#for line1 in f1:
	#	s1 = line1.split('\s')
	#	if int(s[1]) > 10000:
	#		print line,

if __name__ == '__main__':
	main()
