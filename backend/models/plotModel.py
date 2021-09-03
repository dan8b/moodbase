from pydantic import BaseModel, Field
from datetime import datetime, timezone


# remember x value is happiness y value is calm
class PlotDataSubmission(BaseModel):
    happinessVal:float
    calmVal:float
    timestamp = datetime.now(timezone.utc)

    def truncateCoordinates(self):
        truncatedX = f"{self.happinessVal:.2f}"
        truncatedY = f"{self.calmVal:.2f}"
        self.happinessVal=truncatedX
        self.calmVal=truncatedY
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