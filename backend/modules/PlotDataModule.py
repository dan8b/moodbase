from db import plotData, colorData
from models.plotModel import PlotDataSubmission, UserColorChange
from schemas import PlotSchema, ColorSchema
import os

def filePlotClick(user:str,data:PlotDataSubmission):
    data.truncateCoordinates()
    if plotData.find({'community':True}).limit(1).count()<1:
        PlotSchema.createCommunityDocument(data)
    PlotSchema.updateUserPlotDataDocument(user,data)
    PlotSchema.updateCommunityPlotData(data)
    ColorSchema.getPopularColors()
    return True

def getUserClickData(user:str):
    if plotData.find({'user':user}).limit(1).count()<1:
        clickData=PlotSchema.createUserPlotDataDocument(user)
    else:
        clickData=plotData.find_one({'user':user})
    del clickData['_id']
    return clickData

def getCommunityClickData():
    communityData = plotData.find_one({'community':True})
    del communityData['_id']
    return communityData

def getUserColors(user:str):
    if colorData.find({'user':user}).limit(1).count()<1:
        return ColorSchema.createUserColorProfile(user)
    else:
        colorProfile = colorData.find_one({'user':user})
        del colorProfile['_id']
        return colorProfile

def changeUserColor(user:str,changeData:UserColorChange):
    try:
        ColorSchema.updateUserColorProfile(user,changeData)
        return {'Message':'Color change successful'}
    except:
        return {'beavis':'buttheads'}

def getColorList():
    currentCategory='blacks'
    colors={'blacks':[],'grays':[],'blues':[],'greens':[],
            'yellows':[],'browns':[],'oranges':[],'reds':[],
            'pinks':[],'purples':[],'whites':[]}
    with open(os.path.join(os.path.dirname(__file__),"ColorCombinations.csv")) as colorList:
        for color in colorList:
            readCSV=color.split(',')
            if readCSV[0]=="Category":
                currentCategory=readCSV[1].strip()
            else:
                colors[currentCategory].append({'colorHex':readCSV[0],'colorName':readCSV[1].strip()})
    return colors