from typing import Optional
from db import userData
import bcrypt
from fastapi import HTTPException
from schemas.userSchema import parseUser
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime,timedelta
import jwt 

global secret
secret="BLo08OM2380wAit2381I2370Me3an1530Wa7r82t9sBL6o013od15102430Sp325r4e3aDs760750372w3aRTs294419Yo15U6234510Sa33iD459374"



class AuthenticateUser(BaseModel):
    username: str 
    password: str
    email: Optional[EmailStr]

    #JWT STUFF

    def encodeToken(self,scope):
        payload = {
            'exp' : datetime.utcnow() + timedelta(days=0, minutes=30),
            'iat' : datetime.utcnow(),
            'scope': scope, #access_token or refresh_token
            'sub' : self.username
        }
        return jwt.encode(
            payload, 
            secret,
            algorithm='HS256'
        )
    def decodeAccessToken(self,token):
        try:
            payload = jwt.decode(token, secret, algorithms=['HS256'])
            if (payload['scope'] == 'access_token'):
                return payload['sub']   
            raise HTTPException(status_code=401, detail='Scope for the token is invalid')
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid token')

    def refreshToken(self, token):
        try:
            payload = jwt.decode(token, secret, algorithms=['HS256'])
            if (payload['scope'] == 'refresh_token'):
                username = payload['sub']
                new_token = self.encodeToken(username)
                return new_token
            raise HTTPException(status_code=401, detail='Invalid scope for token')
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Refresh token expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid refresh token')

    def addUserToDatabase(self):
        checkUsername={'username':self.username}
    # use find.limit instead of find_one because find will return whether or not doc exists
    # and find_one will return the whole doc
        if userData.find(checkUsername).limit(1).count()>0:
            raise HTTPException(status_code=404,detail="User already exists, try another username")
        else: 
            userToDB=self.dict()
            userToDB['password']=bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())
            userData.insert_one(userToDB)
            return {"Message":"User created successfully"}

        def loginUser(self):
        checkUsername={'username':self.username}
        if userData.find(checkUsername).limit(1).count()<1:
            raise HTTPException(status_code=404,detail="Username not registered")
        else:
            userToCheck=userData.find_one(checkUsername)
            if bcrypt.checkpw(self.password.encode('utf-8'), userToCheck['password']):
                encodedJWT=self.encodeToken(self.username)
                return {'token': encodedJWT}
            else:
                raise HTTPException(status_code=404,detail="Password is incorrect")    



        
         