from pydantic import BaseModel, Field
from datetime import datetime, timezone


# remember x value is happiness y value is calm
class PlotDataSubmission(BaseModel):
    x:float
    y:float
    timestamp = datetime.now(timezone.utc)

    def truncateCoordinates(self):
        truncatedX = f"{self.x:.2f}"
        truncatedY = f"{self.y:.2f}"
        self.x=truncatedX
        self.y=truncatedY
        return True

class UserPlotData(BaseModel):
    user:str
    submissionData:list

class UserColorChoices(BaseModel):
    happyColor:str
    calmColor:str
    sadColor:str
    anxiousColor:str