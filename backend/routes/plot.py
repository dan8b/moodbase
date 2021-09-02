# from routes.auth import gate
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Security
from pydantic import BaseModel
from models.plotModel import PlotDataSubmission, UserPlotData
from modules.AuthenticationModule import getUserFromToken, gate

import modules.PlotDataModule as plot
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

class Empty(BaseModel):
    message:str

plotRoute=APIRouter(
    prefix="/api/plot",
    tags=['PlotData'],
)

@plotRoute.post('/getplotclick')
def getPlotClick(clickData:PlotDataSubmission, user:str=Depends(gate)):
    plot.filePlotClick(user,clickData)
    return {"ok":"Ok"}

@plotRoute.post('/usercolorchoice')
def getInitialColors(nothing:Empty, user:str=Depends(gate)):
    return plot.getUserColors(user)