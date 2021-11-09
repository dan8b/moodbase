from db import plotData
from datetime import date, timedelta
from models.plotModel import PlotDataSubmission
# from bson import Decimal128


def createPlotDataDocument(user: str, newData: PlotDataSubmission):
    plotData.insert_one(
        {
            'user': user,
            'day': newData.timestamp
        }
    )
    return True


def updateUserPlotDataDocument(user: str, newData: PlotDataSubmission):
    plotData.update_one(
        {'user': user},
        {
        '$set':
            {
                newData.timerange: createDataDict(newData)
            },
            '$inc':
            {
                'clickCount': 1
            }
        },
        upsert = True
    )
    return True


def createDataDict(data: PlotDataSubmission):
    return {
        'happiness': data.happiness,
        'calm': data.calm,
        'mapX': data.mapX,
        'mapY': data.mapY
    }


def updateMean(n: int, old: float, new: float, modifier: int):
    print("new")
    print(float(str(new)))
    return ((float(str(old))*n)+float(str(new)))/(n+modifier)


def updateDailyCommunityData(newData: PlotDataSubmission):
    print("Here?")
    if plotData.find({'user': f"!community_{date.today()}"}).limit(1).count() < 1:
        print("no daily")
        plotData.insert_one(
            {
                'user': f"!community_{date.today()}",
                'day': date.today(),
                newData.timerange: createDataDict(newData),
                'clickCount': 1
            }
        )
        setNewMeansAllTime()
        return True
    currentCommunityValues = plotData.find_one(
        {'user': f"!community_{date.today()}"})
    if newData.timerange in currentCommunityValues:
        print("found one")
        plotData.update_one(
            {
                'user': f"!community_{date.today()}",
                'day': str(date.today())
            },
            {
                '$set':
                {
                    newData.timerange: setNewMeansDaily(
                        currentCommunityValues, newData)
                },
                '$inc':
                {
                    'clickCount': 1
                }
             },
             upsert=True
        )
    else:
        updateUserPlotDataDocument(f"!community_{date.today()}", newData)
    return

def setNewMeansAllTime():
    yesterdaysNews = plotData.find_one(
        {'user': f"!community_{date.today()-timedelta(1)}"})
    print(f"clickcount yesterday = {yesterdaysNews['clickCount']}")
    allTime = plotData.find_one({'user': '!communityAllTime'})
    print(f"clickcount for alltime = {allTime['clickCount']}")    
    timeRangeLoop = ['morning', 'midday', 'evening']
    variableKeyLoop = ['happiness', 'calm', 'mapX', 'mapY']
    for t in timeRangeLoop:
        newAllTimeValues = {}
        for k in variableKeyLoop:
            newAllTimeValues[k] = updateMean(allTime['clickCount'],
                                             allTime[t][k], yesterdaysNews[t][k], yesterdaysNews['clickCount'])
        plotData.update_one(
            {
                'user': '!communityAllTime'
            },
            {'$set':
                {
                    t: newAllTimeValues
                }
             },
            {'$inc':
                {
                    'clickCount': yesterdaysNews['clickCount']
                }
             }
        )
    return

def setNewMeansDaily(oldMeans: dict, newData: dict):
    d = newData.dict()
    ct = oldMeans['clickCount']
    vals = oldMeans[newData.timerange]
    updated = {}
    fields = ['happiness', 'calm', 'mapX', 'mapY']
    for f in fields:
        updated[f] = updateMean(ct, vals[f], d[f], 1)
    print(updated)
    return updated

def getAllUserData(user: str):
    return plotData.find({'user': user})