import sys
import wikipedia

def main():

    reload(sys)
    sys.setdefaultencoding('utf8')

    f = open(sys.argv[1])
    out = open(sys.argv[2], 'w')

    out.write(f.readline());

    for line in f.readlines()[1:]:
        # get pagename and page
        pagename = line.split('\t')[0]
        page = wikipedia.page(pagename)

        # get summary
        summary = wikipedia.summary(pagename, sentences=2)
        summary = summary.split("==")[0]

        # get categories
        categories = page.categories
        newline = line.split('\t')[0] + '\t' + line.split('\t')[1] + '\t' + ' '.join(summary.split('\n')) + '\t' + ','.join(categories)
        out.write(newline.encode('utf8') + '\n')


if __name__ == '__main__':
  main()
