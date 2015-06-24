from this_or_that.models import Strategy, Data, User, Selects 
import datetime
import sys

fileNames = []
with open('fileNames.txt') as fp:
    for line in fp:
        line = line.rstrip('\n')
        '''
        print line
        print line.split('_', 1)[0]
        '''
        
        s = Strategy(strategyName=line.split('_', 1)[0])
        s.save()
        
        fileNames.append(line)

i = 1
sys.stdout = open("output.csv", "w")
for fName in fileNames:
    p = Strategy.objects.get(strategyName = fName.split('_', 1)[0])
    j = p.id
    fName = 'log_ret_data_150_strats/'+fName
    f = open(fName, 'r')
    firstline = True
    for line in f:
        if firstline:    #skip first line
            firstline = False
            continue
        line =  line.split(',')  
        print (i),
        print (","),
        print (j),
        print (","),
        print (line[0]),
        print ("," ),
        print (line[1]),
        i+=1
    f.close()    
  
