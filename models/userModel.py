from typing import Optional
from db import userData
from schemas.userSchema import parseUser
from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
    username: str 
    password: str
    email: EmailStr
    active=False


        
         