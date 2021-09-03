from pydantic import BaseModel, Field
from datetime import datetime, timezone


# remember x value is happiness y value is calm
class PlotDataSubmission(BaseModel):
    lineChart: dict
    clickMap: dict
    timestamp = datetime.now(timezone.utc)

    def truncateCoordinates(self):
        dictArr=[self.lineChart,self.clickMap]
        for member in dictArr:
            for key in member:
                member[key]=f"{member[key]:.2f}"
        return True

class UserPlotData(BaseModel):
    user:str
    submissionData:list

class UserColorChoices(BaseModel):
    happyColor:str
    calmColor:str
    sadColor:str
    anxiousColor:str

class UserColorChange(BaseModel):
    newColor:str
    variable:str