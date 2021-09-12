from backend.schemas.ColorSchema import createUserColorProfile, updateUserColorProfile
from db import plotData, colorData
from models.plotModel import PlotDataSubmission, UserColorChange
from schemas import PlotSchema, ColorSchema
import os

def filePlotClick(user:str,data:PlotDataSubmission):
    data.truncateCoordinates()
    if plotData.find({'user':user}).limit(1).count()<1:
        PlotSchema.createUserPlotDataDocument(user,data)
    else:
        PlotSchema.updateUserPlotDataDocument(user,data)
    PlotSchema.updateCommunityPlotData(data)
    return True

def getUserColors(user:str):
    if colorData.find({'user':user}).limit(1).count()<1:
        return ColorSchema.createUserColorProfile(user)
    else:
        colorProfile = colorData.find_one({'user':user})
        return colorProfile['colors']

def changeUserColor(user:str,changeData:UserColorChange):
    try:
        updateUserColorProfile(user,changeData)
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