from pydantic import BaseModel
from datetime import datetime,timezone

class WeightData(BaseModel):
    name:str
    value:float
    timestamp=datetime.now(timezone.utc)
