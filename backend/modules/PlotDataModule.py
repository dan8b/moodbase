from db import plotData, colorData
from models.plotModel import PlotDataSubmission, UserPlotData,UserColorChange


def filePlotClick(user:str,data:PlotDataSubmission):
    data.truncateCoordinates()
    dataToDB=data.dict()
    if plotData.find({'user':user}).limit(1).count()<1:
        newPlotDataList={'user':user,'values':[]}
        newPlotDataList['values'].append(dataToDB)
        plotData.insert_one(newPlotDataList)
    else:
        plotData.update_one({'user':user},{'$push':{'values':dataToDB}})
    return {"Works":'works'}

def getUserColors(user:str):
    if colorData.find({'user':user}).limit(1).count()<1:
        newColorProfile = {'user':user,'colors':{'happyColor':'yellow','sadColor':'indigo','calmColor':'lightskyblue','anxiousColor':'orange'}}
        colorData.insert_one(newColorProfile)
        return newColorProfile['colors']
    else:
        colorProfile = colorData.find_one({'user':user})
        return colorProfile['colors']

def changeUserColor(user:str,changeData:UserColorChange):
    variableName=changeData.variable
    updatedColor=changeData.newColor
    colorData.update_one({'user':user},[{'$set':{'colors':{variableName:updatedColor}}}])
    return {'message':'color change successful'}

def retrieveAndPrepareClickData(user):
    data = plotData.find_one({'user':user})['values']
    prepared = {'clickMap':[],'lineChart':data}
    
    return prepared


        