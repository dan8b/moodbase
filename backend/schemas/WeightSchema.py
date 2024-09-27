from db import weightData, weightPopularityData
from models.weightModel import WeightData, WeightLookupObject
from modules.HelperFunctions import returnDay


def createWeightConfigDocument(user: str):
    defaultWeightConfig = {
        'user': user,
        'config': True,
        'family': {'dateAdded': returnDay(), 'valueToDate': 0},
        'health': {'dateAdded': returnDay(), 'valueToDate': 0},
        'work': {'dateAdded': returnDay(), 'valueToDate': 0},
        'school': {'dateAdded': returnDay(), 'valueToDate': 0},
        'relationships': {'dateAdded': returnDay(), 'valueToDate': 0},
        'spirituality,faith': {'dateAdded': returnDay(), 'valueToDate': 0}
    }
    weightData.insert_one(defaultWeightConfig)
    for key in defaultWeightConfig.keys():
        if key != 'user':
            updateWeightPopularity(key)
    return True

# increment the count of users with a given weight button by 1 when assigning user default weight buttons

# looks for a set of weight configs and up-to-date data for user
# params: user (string) - a username to query by
# returns: serialized JSON (dict) containing database entry corresponding to user weight data for that time - config and current
def lookForDailyRadius(user: str):
    if weightData.find({'user': user, 'config': True}).limit(1).count() < 1:
        createWeightConfigDocument(user)
    if weightData.find({'user':user, 'day':returnDay()}).limit(1).count() < 1:
        return createDailyRadius(user)
    else:
        return weightData.find_one({'user':user, 'day':returnDay()}, {'_id':0, 'user':0, 'day':0} )

# create placeholder mood weight data
# params: user (string) - user for whom to create data entry
# returns: serialized JSON (dict) with database entry - current only
def createDailyRadius(user: str):
    userConfig = weightData.find_one({'user': user, 'config':True}, {'_id':0, 'user':0, 'config': 0})
    dailyVertices = {}
    for configVariable in userConfig.keys():
        dailyVertices[configVariable] = 0
    dailyVertices['user'] = user
    dailyVertices['day'] = returnDay()
    weightData.insert_one(dailyVertices)
    return dailyVertices

def updateWeightPopularity(name: str):
    weightPopularityData.update_one(
        {'name': name},
        {
            '$inc':
            {
                'value': 1
            }
        },
        upsert=True
    )
    return True


def updateWeightData(user: str, newData: WeightData):
    weightData.update_one(
        {'user': user},
        {
            '$inc':
                {newData.name+'.'+newData.timerange: newData.delta},
        },
        upsert=True
    )
    return True


def createNewButton(name: str, user: str):
    weightData.update_one({'user': f"{user}!weightconfig"},
                          {
            '$set':
            {
                name: 0
            }
        },
    ),
    updateWeightPopularity(name)
    return True


def wipeButt(name: str, user: str):
    weightData.update_one(
        {'user': f"{user}!weightconfig"},
        {'$unset': {name: ""}}
    )
    weightPopularityData.update_one(
        {'name': name},
        {
            '$inc':
            {
                'value': -1
            }
        }
    )
    return True


def getPopularWeights():
    return weightPopularityData.aggregate(
        [
            {'$sort': {'name': 1}}
        ]
    )
