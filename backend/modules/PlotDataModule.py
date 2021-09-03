from db import plotData, colorData
from models.plotModel import PlotDataSubmission, UserPlotData,UserColorChange
import os

def filePlotClick(user:str,data:PlotDataSubmission):
    data.truncateCoordinates()
    if plotData.find({'user':user}).limit(1).count()<1:
        plotDataObj = { 
        'user':user,
        'lineChartHappinessVals':[data.lineChart['happinessVal']],
        'lineChartCalmVals':[data.lineChart['calmVal']],
        'clickMapHappinessVals':[data.clickMap['happinessVal']],
        'clickMapCalmVals':[data.clickMap['calmVal']],
        'timestamp':[data.timestamp]
        }
        plotData.insert_one(plotDataObj)
    else:
        plotData.update_one(
            {'user':user},
            
                {'$push':
                    {
                    'lineChartHappinessVals':data.lineChart['happinessVal'] ,
                    'lineChartCalmVals':data.lineChart['calmVal'],
                    'clickMapHappinessVals':data.clickMap['happinessVal'],
                    'clickMapCalmVals':data.clickMap['calmVal'],
                    'timestamp':data.timestamp
                    }
                }
            
        )
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

def getColorList():
    colors=[]
    with open(os.path.join(os.path.dirname(__file__),"ColorCombinations.csv")) as colorList:
        for color in colorList:
            readCSV=color.split(',')
            colors.append({'colorHex':readCSV[0],'colorName':readCSV[1].strip()})
    return colors