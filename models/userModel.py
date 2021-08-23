from typing import Optional
from db import userData
import bcrypt
from fastapi import HTTPException
from schemas.userSchema import parseUser
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime,timedelta
import jwt 
secret="BLO08OM2380wAit2381I2370Me3an1530Wart9sblo0od15102430Spr4eaDs760750372w3aRTs294419Yo15U6234510Sa33iD459374"
class UserForRegistration(BaseModel):
    username: str 
    password: str
    email: EmailStr


    def addUserToDatabase(self):
        checkUsername={'username':self.username}
    # use find.limit instead of find_one because find will return whether or not doc exists
    # and find_one will return the whole doc
        if userData.find(checkUsername).limit(1).count()>0:
            raise HTTPException(status_code=404,detail="User already exists, try another username")
        else: 
            userToDB=self.dict()
            # userToDB['password']=bcrypt.hashpw(self.password.encode('utf-8'),bcrypt.gensalt())
            userToDB['password']=bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())
            userData.insert_one(userToDB)
            return {"Message":"User created successfully"}

 
             
class UserForLogin(BaseModel):
    username:str
    password:str

    def loginUser(self):
        checkUsername={'username':self.username}
        if userData.find(checkUsername).limit(1).count()<1:
            raise HTTPException(status_code=404,detail="Username not registered")
        else:
            userToCheck=userData.find_one(checkUsername)
            if bcrypt.checkpw(self.password.encode('utf-8'), userToCheck['password']):
                payload = {
                    'exp' : datetime.utcnow() + timedelta(days=0,minutes=33),
                    'iat':datetime.utcnow(),
                    'sub': self.username
                }
                encoded_jwt = jwt.encode(payload, secret, algorithm="HS256")
                return {'token': encoded_jwt}
            else:
                raise HTTPException(status_code=404,detail="Password is incorrect")    

        
         