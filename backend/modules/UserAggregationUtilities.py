from db import aggregateData

def updateUserCountOnActivation():
    try:
        aggregateData.update_one({'aggType':'users'}, {'$inc':{'count':1} })
    except:
        aggregateData.insert_one({'aggType':'users','count':1,'plotClicks':0})

def getNumberOfUsers():
    try:
        return aggregateData.find_one({'aggType':'users'})['count']
    except:
        return False