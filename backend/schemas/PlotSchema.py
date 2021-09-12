from db import plotData
from datetime import datetime
from models.plotModel import PlotDataSubmission

def createCommunityDocument():
    plotData.insert_one(
        {
            'community':True,
            'dayList':[],
            'averages':{
                'clickMapHappinessAverage':[],
                'clickMapCalmAverage':[],
                'lineChartHappinessAverage':[],
                'lineChartCalmAverage':[],
            },
            'totalHappinessByDay':[],    
            'totalCalmByDay':[],
            'clickCount':0        
        }
    )
    return True

def createUserPlotDataDocument(user:str,newData:PlotDataSubmission):
    plotData.insert_one(
        { 
        'user':user,
        'totals':{
            'totalHappiness':newData.lineChart['happinessVal'],
            'totalCalm':newData.lineChart['calmVal'],
        },
        'lineChart': {
            'lineChartHappinessVals':[newData.lineChart['happinessVal']],
            'lineChartCalmVals':[newData.lineChart['calmVal']],
        },
        'clickMap':{
            'clickMapHappinessVals':[newData.clickMap['happinessVal']],
            'clickMapCalmVals':[newData.clickMap['calmVal']],
        },
        'timestamp':[newData.timestamp]
        }
    )
    return True

def updateUserPlotDataDocument(user:str,newData:PlotDataSubmission):
    plotData.update_one(
        {'user':user},        
            [{
            '$push':
                {
                    {
                        'lineChart':
                        {
                            'lineChartHappinessVals':newData.lineChart['happinessVal'] ,
                            'lineChartCalmVals':newData.lineChart['calmVal'],
                        }
                    },
                    {
                        'clickMap':
                        {
                            'clickMapHappinessVals':newData.clickMap['happinessVal'],
                            'clickMapCalmVals':newData.clickMap['calmVal']
                        }
                    },
                    {'timestamp':newData.timestamp}
                }
            }],
                { '$inc':
                    {
                        'totalHappiness':newData.lineChart['happinessVal'],
                        'totalCalm':newData.lineChart['calmVal']
                    }    
                }                    
        )
    return True

def updateCommunityPlotData(newData:PlotDataSubmission):
    listOfValues=newData.returnList()
    i=0
    currentCommunityData = plotData.find_one({'community':True})
    clickCount=currentCommunityData['clickCount']+1
    if currentCommunityData['dayList'][-1] != datetime.today():
        createNewDay(listOfValues)
        return True
    for key,value in currentCommunityData['averages'].items():
        plotData.update_one(
            {'community':True},
            [{'set':
                {'averages':{str(key):(value[-1]+listOfValues[i])/clickCount}}
            }],
        )
        i+=1
    index=len(currentCommunityData['totalsByDay'])-1
    plotData.update_one(
        {'community':True},
        {'$inc':
            {
            'totalHappinessByDay.'+index:newData.lineChart['happinessVal'],
            'totalCalmByDay.'+index:newData.lineChart['calmVal'],
            'clickCount':1
            }
        }
    )
    
    return True
    
def createNewDay(listOfValues:list):
    plotData.update_one({'community':True},
        {'$push':
            {
            'dayList':datetime.today(),
            'averages.clickMapHappinessAverage':listOfValues[0],
            'averages.clickMapCalmAverage':listOfValues[1],
            'averages.lineChartHappinessAverage':listOfValues[2],
            'averages.lineChartCalmAverage':listOfValues[3],
            'totalHappinessByDay':listOfValues[2],
            'totalCalmByDay':listOfValues[3],
            }
        })
    return True