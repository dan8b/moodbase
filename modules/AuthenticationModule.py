from fastapi.security import OAuth2PasswordRequestForm
from db import userData
from fastapi import HTTPException, Depends
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime,timedelta

global secret
secret="BLo08OM2380wAit2381I2370Me3an1530Wa7r82t9sBL6o013od15102430Sp325r4e3aDs760750372w3aRTs294419Yo15U6234510Sa33iD459374"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verifyUserAtLogin(loginAttempt):
    checkUsername={'username':loginAttempt['username']}
    if userData.find(checkUsername).limit(1).count()<1:
        return False
    else:
        userToCheck=userData.find_one(checkUsername)
        if pwd_context.verify(loginAttempt['password'].encode('utf-8'), userToCheck['password']):
            return userToCheck
        else:
            return False    

def loginAndReturnToken(loginFormData: OAuth2PasswordRequestForm = Depends()):
    checkUsername={'username':loginFormData.username}
    if userData.find(checkUsername).limit(1).count()<1:
        raise HTTPException(status_code=400,detail="Username not registered")
    else:
        userToCheck=userData.find_one(checkUsername)
        if pwd_context.verify(loginFormData.password.encode('utf-8'), userToCheck['password']):
            encodedJWT=createAccessToken(loginFormData.username)
            return {'access_token': encodedJWT, "token_type":"bearer"}
        else:
            raise HTTPException(status_code=400,detail="Password is incorrect")    

def createAccessToken(subName):
    payload = {
        'exp' : datetime.utcnow() + timedelta(days=0, minutes=30),
        'iat' : datetime.utcnow(),
        'sub' : subName        }
    return jwt.encode(
        payload, 
        secret,
        algorithm='HS256'
    )