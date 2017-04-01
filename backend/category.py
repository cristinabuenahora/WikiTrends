import sys
import numpy
import wikipedia

def main():

    reload(sys)
    sys.setdefaultencoding('utf8')

    f = open(sys.argv[1])
    out = open(sys.argv[2], 'w')

    politics = ['geography', 'law', 'politic', 'government', 'president', 'congress', 'judge']
    history = ['history', 'war', 'philosophy', 'society', 'holiday', 'century', 'bomb']
    techScience = ['industry', 'tech', 'health', 'science', 'matter', 'nature', 'disease', 'code', 'math', 'algebra']
    sports = ['sport', 'game', 'athelete', 'basketball', 'football', 'soccer', 'baseball', 'tennis', 'fifa', 'boxing', 'run']
    entertainment = ['arts', 'culture', 'entertainment', 'movie', 'actor', 'actress', 'novel', 'television', 'film', 'album', 'music', 'animate', 'animal', 'comic', 'video']

    #list = ['arts', 'culture', 'entertainment', 'game', 'geography', 'health', 'history', 'humanities', 'industry', 'law', 'life', 'math', 'matter', 'nature', 'philsophy', 'people', 'politic', 'reference work', 'religion', 'science', 'technology', 'society']
    list = [politics, history, techScience, sports, entertainment]
    listName = ['politics', 'history', 'techScience', 'sports', 'entertainment']
    #print list

    out.write(f.readline());

    for line in f.readlines()[1:]:
        # get pagename and page
        pagename = line.split('\t')[0]
        pagename = pagename.replace('_', ' ')
        categories = line.split('\t')[3].split(',')
        count = numpy.zeros(len(list))

        for c in categories:
            for i in range(0, len(count)):
                for l in list[i]:
                    if l in c.lower():
                        count[i] = count[i] + 1

        max = 0
        main = []
        for i in range(0, len(count)):
            if (count[i] == max and count[i] != 0):
                max = count[i]
                main.append(listName[i])
            elif (count[i] > max and count[i] != 0):
                main = []
                max = count[i]
                main.append(listName[i])

        newline = line.split('\t')[0] + '\t' + line.split('\t')[1] + '\t' + line.split('\t')[2] + '\t' + ','.join(main)
        out.write(newline.encode('utf8') + '\n')


if __name__ == '__main__':
  main()
