from pydantic import BaseModel
from datetime import datetime

class WeightLookupObject(BaseModel):
    username:str
    day:datetime

class WeightData(BaseModel):
    name:str
    value:int
    delta:int
    timerange:str
