#-*- encoding:utf-8 -*-
import requests
dataJSONIles = ('Moutsamoudou','Mamoudzou','Moheli','Moroni')
executionDirectory = "/home/Wakidou/SiteAeroport/"
for ile in dataJSONIles :
    r = requests.get('http://api.wunderground.com/api/5fe80449e735d30f/conditions/q/COMOROS/'+ile+'.json')
    print "code de renvoi HTTP pour {1} : {0}".format(r.status_code,ile)

    file = None
    if ile == 'Moutsamoudou' :
        file = open(executionDirectory+"Anjouan.json","w")
    elif ile == 'Mamoudzou' :
        file = open(executionDirectory+"Mayotte.json","w")
    else :
        file = open(executionDirectory+ile+".json","w")
        
    file.writelines(r.text)
    file.close()