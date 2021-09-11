# from routes.auth import gate
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Security
from pydantic import BaseModel
from models.plotModel import PlotDataSubmission, UserPlotData,UserColorChange
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
    print(colorChange)
    return plot.changeUserColor(user,colorChange)

@plotRoute.get('/getclickdata')
def getClickData(user:str = Depends(gate)):
    try:
        dataDict = plotData.find_one({'user':user})
        del dataDict['_id']
        return dataDict
    except:
        return HTTPException(status_code=404,detail="No plot data exists for this user")


@plotRoute.get('/listofcolors')
def sendColorList():
    return plot.getColorList()