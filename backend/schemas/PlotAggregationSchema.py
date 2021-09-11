from datetime import datetime, timezone
from db import aggregateData
from models.plotModel import PlotDataSubmission

# initialize plot aggregate tracking in the database
# for count of clicks (IN THAT DAY), daily averages/totals, all time averages/totals
def createAggregatePlotObject(initialData: PlotDataSubmission):
    dailyCount = {'aggType':'plotClick','count':1}
    dailyVals = {
        'aggType':'plot',
        'timeframe':'today',
        'day':datetime.datetime.today().day(),
        'averages': {
            'clickMap':{'happinessVal':initialData.clickMap['happinessVal'],'calmVal':initialData.clickMap['calmVal']},
            'lineChart':{'happinessVal':initialData.lineChart['happinessVal'],'calmVal':initialData.lineChart['calmVal']},
            },
        'totals':{'happinessVal':initialData.lineChart['happinessVal'],'calmVal':initialData.lineChart['calmVal']}
    }
    allTimeVals = {
        'aggType':'plot',
        'timeframe':'allTime',
        'averages':{
            'clickMap':[{'day':datetime.datetime.today(),'happinessVal':initialData.clickMap['happinessVal'],
                            'calmVal':initialData.clickMap['calmVal']}],
            'lineChart':{
                'overTime':[{'day':datetime.datetime.today(),'happinessVal':initialData.lineChart['happinessVal'],
                            'calmVal':initialData.lineChart['calmVal']}]},
                'toDate':{'happinessVal':initialData.lineChart['happinessVal'],'calmVal':initialData.lineChart['calmVal']}
                },
        'totals': {
            'overTime':[{'day':datetime.datetime.today(),'happinessVal':0,'calmVal':0}],
            'toDate':{'happinessVal':0,'calmVal':0}
        }
    }
    aggregateData.insert_many([dailyCount,dailyVals,allTimeVals])
    return True
 
# add data from a click to the document (total and average)
# return the result of updatePlotTotals (which is itself returning a different function's output)
def updateAggregatePlotData(newData:PlotDataSubmission):
    if aggregateData.find({'aggType':'plot'}).limit(1).count()<1:
        createAggregatePlotObject(newData)
    else:
        aggregateData.update_one( {'aggType':'plotClick'}, {'$inc':{'count':1} })
        todayPlotAggregate=aggregateData.find_one({'aggType':'plot','timeframe':'today'})           
        replacement = updateDailyPlotTotals(newData, todayPlotAggregate)
        aggregateData.replace_one({'aggType':'plot','timeframe':'today'},replacement)
    return True

# add click values to existing totals
# returns a call to the function that will update the averages values
# which will return a fully updated dictionary to use as a replacxement in updateAggregatePlotData
def updateDailyPlotTotals(newData:PlotDataSubmission,currentData:dict):
    currentData['totals']['happinessVal'] += newData.lineChart['happinessVal']
    currentData['totals']['calmVal'] += newData.lineChart['calmVal']
    return updateDailyPlotAverages(newData.clickMap,currentData)

# generate new averages upon filing new click data from a user 
# use updated totals from updatePlotTotals to generate new averages for lineChart data
# use existing averages + new click values to generate new averages for clickMap data
def updateDailyPlotAverages(newClickMapValues:dict, currentData:dict):
    count = aggregateData.find_one({'aggType':'plotClick'})['count']
    currentClickMapAverages = currentData['averages']['clickMap']
    for key, value in currentClickMapAverages:
        currentData['averages']['clickMap'][key] = (value/count)+(newClickMapValues[key]/count)
    currentTotals = currentData['totals']
    for key, value in currentTotals:
        currentData['averages']['lineChart'][key] = value/count  
    return currentData
        
def addDailyToAllTime(currentData:dict):
    if currentData['day'] != datetime.today().day():
        
    return True