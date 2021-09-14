from db import plotData
from datetime import datetime
from models.plotModel import PlotDataSubmission

def createCommunityDocument(initialData:PlotDataSubmission):
    plotData.insert_one(
        {
            'community':True,
            'dayList':[datetime.now().replace(hour=0,minute=0,second=0,microsecond=0)],
            'clickMap':[{'happinessVal':initialData.clickMap['happinessVal'], 'calmVal':initialData.clickMap['calmVal']}],
            'averageLineChartHappiness':[initialData.lineChart['happinessVal']],
            'averageLineChartCalm':[initialData.lineChart['calmVal']],
            'totalHappinessByDay':[initialData.lineChart['happinessVal']],    
            'totalCalmByDay':[initialData.lineChart['calmVal']],
            'clickCount':0   
        }
    )
    return True

def createUserPlotDataDocument(user:str):
    clickData= { 
        'user':user,
        'totalHappiness':0,
        'totalCalm':0,
        'lineChart': {
            'lineChartHappinessVals':[],
            'lineChartCalmVals':[],
        },
        'clickMapVals':[],
        'timestamp':[]
        }
    plotData.insert_one(clickData)
    return clickData

def updateUserPlotDataDocument(user:str,newData:PlotDataSubmission):
    plotData.update_one(
        {'user':user},        
            {
            '$push':
                {
                    'lineChart.lineChartHappinessVals':newData.lineChart['happinessVal'],
                    'lineChart.lineChartCalmVals':newData.lineChart['calmVal'],
                    'clickMapVals':{'happinessVal':newData.clickMap['happinessVal'],'calmVal':newData.clickMap['calmVal']},
                    'timestamp':newData.timestamp
                },
            '$inc':
                {
                    'totalHappiness':newData.lineChart['happinessVal'],
                    'totalCalm':newData.lineChart['calmVal']
                }    
            },
            upsert=True     
        )
    return True

def updateCommunityPlotData(newData:PlotDataSubmission):
    listOfValues=newData.returnList()
    i=0
    currentCommunityData = plotData.find_one({'community':True})
    clickCount=currentCommunityData['clickCount']+1
    if currentCommunityData['dayList'][-1].day != datetime.now().replace(hour=0,minute=0,second=0,microsecond=0).day:
            createNewDay(listOfValues)
    else:
        index=len(currentCommunityData['dayList'])-1
        del currentCommunityData['_id']
        for key,value in currentCommunityData.items():
            if key[5]=="M":
                for innerKey,innerValue in value[index].items():                
                    plotData.update_one(
                        {'community':True},
                        {'$set':
                                {key+'.'+str(index)+'.'+innerKey:(innerValue+listOfValues[i])/clickCount}
                        }
                    )
                i+=1
            if key[0]=="a":
                plotData.update_one(
                    {'community':True},
                    {'$set':
                        {key+"."+str(index):((value[index]+listOfValues[i])/clickCount)}
                    }
                )
                i+=1
            elif key[0]=='t':
                plotData.update_one(
                    {'community':True},
                    {'$inc':
                        {
                        'totalHappinessByDay.'+str(index):newData.lineChart['happinessVal'],
                        'totalCalmByDay.'+str(index):newData.lineChart['calmVal'],
                        }
                    }
                )
        plotData.update_one(
            {'community':True},
            {'$inc':
                {
                'clickCount':1
                }
            }
        )
            
    
    return True

def createNewDay(listOfValues:list):
    plotData.update_one({'community':True},
        {'$push':
            {
            'dayList':datetime.now().replace(hour=0,minute=0,second=0),
            'clickMap':{'happinessVal':listOfValues[0],'calmVal':listOfValues[1]},
            'averageLineChartHappiness':listOfValues[2],
            'averageLineChartCalm':listOfValues[3],
            'totalHappinessByDay':listOfValues[2],
            'totalCalmByDay':listOfValues[3],
            }
        })
    return True