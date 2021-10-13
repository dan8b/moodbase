from pydantic import BaseModel

class GroupData(BaseModel):
    name:str 
    members:list
    colors:dict
    weightButtons:list
    adminUser:str