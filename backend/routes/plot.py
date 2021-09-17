# from routes.auth import gate
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Security
from pydantic import BaseModel
from models.plotModel import PlotDataSubmission,UserPlotData,UserColorChange
from modules.AuthenticationModule import getUserFromToken, gate
import modules.PlotDataModule as plot
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from db import plotData

plotRoute=APIRouter(
    prefix="/api/plot",
    tags=['PlotData'],
)

@plotRoute.post('/getplotclick')
def getPlotClick(clickData:PlotDataSubmission, user:str=Depends(gate)):
    return plot.filePlotClick(user,clickData)

@plotRoute.post('/usercolorchoice')
def getInitialColors(user:str=Depends(gate)):
    return plot.getUserColors(user)

@plotRoute.post('/changecolors')
def changeColor(colorChange:UserColorChange,user:str = Depends(gate)):
    return plot.changeUserColor(user,colorChange)

@plotRoute.get('/userclickdata')
def getUserClickData(user:str = Depends(gate)):
    return plot.getUserClickData(user)

@plotRoute.get('/communityclickdata')
def getCommunityClickData(user: str = Depends(gate)):
    return plot.getCommunityClickData()

@plotRoute.get('/listofcolors')
def sendColorList():
    return plot.getColorList()

@plotRoute.get('/popularcolors')
def getPopularColors():
    return plot.getPopularColors()

@plotRoute.get('/communitycolors')
def getCommunityColors():
    return plot.getCommunityColors()
