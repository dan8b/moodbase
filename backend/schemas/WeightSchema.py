from db import weightData
from models.weightModel import WeightData

def createWeightData(user:str):
    newWeightData ={
        'user':user,
        'family':{'totals':0,'daily':[],'withinDay':[]},
        'health':{'totals':0,'daily':[],'withinDay':[]},
        'work/school':{'totals':0,'daily':[],'withinDay':[]},
        'relationships':{'totals':0,'daily':[],'withinDay':[]},
        'days':[]
    }
    weightData.insert_one(newWeightData)
    return True

def updateWeightData(user:str,newData:WeightData):
    weightData.update_one({'user':user},
    { '$inc':
        {newData.name+'.$totals':newData.value}    
    },
    { '$push':
        {newData.name+'.$withinDay.-1':newData.value}
    }
    )