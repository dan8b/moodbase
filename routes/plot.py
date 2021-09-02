# from routes.auth import gate
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel
from models.plotModel import PlotDataSubmission, UserPlotData
from modules.AuthenticationModule import getUserFromToken, gate
import modules.PlotDataModule as plot

class Empty(BaseModel):
    message:str

plotRoute=APIRouter(
    prefix="/api/plot",
    tags=['PlotData'],
)

@plotRoute.post('/getplotclick')
def getPlotClick(clickData:PlotDataSubmission, token:str=Depends(gate)):
    user = getUserFromToken(token)
    plot.filePlotClick(user,clickData)
    return {"ok":"Ok"}

@plotRoute.post('/usercolorchoice')
def getInitialColors(nothing:Empty, token:str=Depends(gate)):
    user=getUserFromToken(token)
    return plot.getUserColors(user)