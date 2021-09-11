from pydantic import BaseModel, Field
from datetime import datetime, timezone


# remember x value is happiness y value is calm
class PlotDataSubmission(BaseModel):
    lineChart: dict
    clickMap: dict
    timestamp = datetime.now(timezone.utc)

    def truncateCoordinates(self):
        for key, value in self.lineChart.items():
            self.lineChart[key] = round(value,1)
        for key,value in self.clickMap.items():
            self.clickMap[key]=int(value)
        return True 
    
class UserPlotData(BaseModel):
    user:str
    dictWithLists:dict

class UserColorChoices(BaseModel):
    happyColor:str
    calmColor:str
    sadColor:str
    anxiousColor:str

class UserColorChange(BaseModel):
    newColor:str
    variable:str
