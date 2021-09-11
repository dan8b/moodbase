from db import plotData
from datetime import datetime
from models.plotModel import PlotDataSubmission

def createCommunityDocument():
    plotData.insert_one(
        {
            'community':True,
            'averages':{
                'clickMapHappinessAverage':[],
                'clickMapCalmAverage':[],
                'lineChartHappinessAverage':[],
                'lineChartCalmAverage':[],
            },
            'totalsByDay':[],    
            'clickCount':0        
        }
    )
    return True

def createPlotDataDocument(user:str,newData:PlotDataSubmission):
    plotData.insert_one(
        { 
        'user':user,
        'totalHappiness':newData.lineChart['happinessVal'],
        'totalCalm':newData.lineChart['calmVal'],
        'lineChartHappinessVals':[newData.lineChart['happinessVal']],
        'lineChartCalmVals':[newData.lineChart['calmVal']],
        'clickMapVals':[newData.clickMap],
        'timestamp':[newData.timestamp]
        }
    )
    return True

def updatePlotDataDocument(user:str,newData:PlotDataSubmission):
    plotData.update_one(
        {'user':user},        
            {
            '$push':
                {
                'lineChartHappinessVals':newData.lineChart['happinessVal'] ,
                'lineChartCalmVals':newData.lineChart['calmVal'],
                'clickMapVals':newData.clickMap,
                'timestamp':newData.timestamp
                },
                '$inc':
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
    clickCount=currentCommunityData['clickCount']
    if currentCommunityData['totalsByDay'][-1]['day'] != datetime.today():
        createNewDay(listOfValues)
        return True
    for key,value in currentCommunityData['averages']:
        currentCommunityData['averages'][key]=(value/clickCount)+(listOfValues[i]/clickCount)
        i+=1
    index=len(currentCommunityData['totalsByDay'])-1
    plotData.update_one(
        {'community':True},
        {'$set':
            {
                'averages':currentCommunityData['averages'],
            }
        },
        {'$inc':
            {
            'totalsByDay.'+index+'.happiness':newData.lineChart['happinessVal'],
            'totalsByDay.'+index+'.calm':newData.lineChart['calmVal'],
            }
        }
    )
    
    return True
    
def createNewDay(listOfValues:list):
    valuesWithDay=[]
    for value in listOfValues:
        valuesWithDay.append({'day':datetime.today(),'value':value}) 
    plotData.update_one({'community':True},
        {'$push':
            {
            'averages.clickMapHappinessAverage':valuesWithDay[0],
            'averages.clickMapCalmAverage':valuesWithDay[1],
            'averages.lineChartHappinessAverage':valuesWithDay[2],
            'averages.lineChartCalmAverage':valuesWithDay[3],
            'totalsByDay':{'day':datetime.today(),'happiness':valuesWithDay[2],'calm':valuesWithDay[3]}
            }
        })
    return True