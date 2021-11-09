from typing import ValuesView
from pydantic import BaseModel, Field
from datetime import date


# remember x value is happiness y value is calm
class PlotDataSubmission(BaseModel):
    happiness: float
    calm: float
    mapX: int
    mapY: int
    timerange: str
    timestamp = str(date.today())
        
class UserPlotData(BaseModel):
    user:str
    dictWithLists:dict

class UserColorChoices(BaseModel):
    happyColor:dict
    calmColor:dict
    sadColor:dict
    anxiousColor:dict

class UserColorChange(BaseModel):
    colorChange:dict
    variable:str
