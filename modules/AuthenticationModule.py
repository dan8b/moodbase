# database stuff
from db import userData

# email stuff
import modules.EmailModule as email

# dependency injection stuff
from fastapi import HTTPException, Depends

# jwt and password stuff
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

def addUserToDatabase(user):
    checkUsername={'username':user.username}
    # use find.limit instead of find_one because find will return whether or not doc exists
    # and find_one will return the whole doc
    if userData.find(checkUsername).limit(1).count()>0:
        raise HTTPException(status_code=404,detail="User already exists, try another username")
    else: 
        userToDB=user.dict()
        userToDB['password']=pwd_context.hash(user.password)
        userData.insert_one(userToDB)
        return email.send_email_async("Test","danbidikov@gmail.com","poop")

def getUserFromToken(token):
    decoded = jwt.decode(token, secret, 'HS256')
    userStr=decoded['sub']
    user = userData.find_one({'username':userStr})
    return user

