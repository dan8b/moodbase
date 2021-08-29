from typing import Optional
from db import userData
from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
    id=""
    username: str 
    password: str
    email: EmailStr
    active= False

class ActivationModel(BaseModel):
    token:str

class ResetModel(BaseModel):
    email:Optional[EmailStr]
    token:Optional[str]
    newPassword:Optional[str]