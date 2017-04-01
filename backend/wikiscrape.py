import sys
import wikipedia

def main():

    reload(sys)
    sys.setdefaultencoding('utf8')

    f = open(sys.argv[1])
    out1 = open(sys.argv[2], 'w')
    out2 = open(sys.argv[3], 'w')

    for line in f.readlines()[1:]:
        # get pagename and page
        pagename = line.split('\t')[0]
        pagename = pagename.replace('_', ' ')
        print pagename
        page = wikipedia.page(pagename)

        # get summary
        summary = wikipedia.summary(pagename, sentences=2)
        newline = line.split('\n')[0] + '\t' + summary
        out1.write(newline.encode('utf8') + '\n')

        # get categories
        pagename = pagename.replace(' ', '_')
        categories = page.categories
        newline = pagename + '\t' + ','.join(categories)
        out2.write(newline.encode('utf8') + '\n')


if __name__ == '__main__':
  main()
