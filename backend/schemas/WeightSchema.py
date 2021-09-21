from db import weightData
from models.weightModel import WeightData
from datetime import datetime

def createWeightData(user:str):
    newWeightData ={
        'user':user,
        'family':{'totals':0,'daily':[0],'withinDay':[[0]]},
        'health':{'totals':0,'daily':[0],'withinDay':[[0]]},
        'work/school':{'totals':0,'daily':[0],'withinDay':[[0]]},
        'relationships':{'totals':0,'daily':[0],'withinDay':[[0]]},
        'spirituality/faith':{'totals':0,'daily':[0],'withinDay':[[0]]},        
        'days':[datetime.today()]
    }
    weightData.insert_one(newWeightData)
    return True

def createWeightByPopularity():
    weightData.insert_one(
        {
        'popularity':True,
        'family':{'value':1},
        'health':{'value':1},
        'work/school':{'value':1},
        'relationships':{'value':1},
        'spirituality/faith':{'value':1}
        }
    )
    return True

def updateWeightPopularity(name:str):
    weightData.update_one(
        {'popularity':True},
        {
            '$inc':
            {
                name:1
            }
        }
    )
    return True


def updateWeightData(user:str,newData:WeightData):
    index=len(weightData.find_one({'user':user})['days'])-1
    weightData.update_one({'user':user},
        { 
            '$inc':
                {newData.name+'.totals':newData.delta},    
             '$push':
                {newData.name+'.withinDay.'+str(index):newData.value},
             '$set':
                {newData.name+'.daily.'+str(index):newData.value}
        },
    )
    return True

def retrieveWeightData(user:str):
    if weightData.find({'user':user}).limit(1).count()<1:
        createWeightData(user=user)
    currentButtonValues=weightData.find_one({'user':user},{'_id': 0,'user':0})
    if currentButtonValues['days'][-1].day != datetime.today().day:
        return createNewDay(user=user,buttonNames=currentButtonValues.keys())
    else:
        buttons={}
        for key,value in currentButtonValues.items():
            if key != 'days':
                buttons[key]=value['withinDay'][-1][-1]
        return buttons

def createNewDay(user:str,buttonNames:list):
    newDayNewButtons={}
    for name in buttonNames:
        if name!='days':
            newDayNewButtons[name]=0
            weightData.update_one({'user':user},
                {
                    '$push':
                        {
                            name+'.withinDay':[0],
                            name+'.daily':0
                        }
                }
            )
        else:
            weightData.update_one({'user':user},
                {
                    '$push':
                        {
                            'days':datetime.today()
                        },
                }
            )
    return newDayNewButtons

def createNewButton(name:str,user:str):
    weightData.update_one({'user':user},
        { 
        '$set':
        {
        name+'.totals':0,
        name+'.daily':[0],
        name+'.withinDay':[[0]]
        }
    },
    ),
    if weightData.find({'popularity':True}
    return True

def getPopularWeights():
    return weightData.aggregate([
        {
            '$match':{'popularity':True}
        },
        {
            
        }
    ])
