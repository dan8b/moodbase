# database stuff
from db import userData

# dependency injection stuff
from fastapi import HTTPException, Depends

# jwt and password stuff
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime,timedelta

# mail stuff
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
import os
from dotenv import load_dotenv
load_dotenv('.env')

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
        return {"Message":"User created successfully"}

def getUserFromToken(token):
    decoded = jwt.decode(token, secret, 'HS256')
    userStr=decoded['sub']
    user = userData.find_one({'username':userStr})
    return user

# environment variables

class Envs:
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_FROM = os.getenv('MAIL_FROM')
    MAIL_PORT = int(os.getenv('MAIL_PORT'))
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_FROM_NAME = os.getenv('MAIN_FROM_NAME')

# mail config

mailer = ConnectionConfig(
    MAIL_USERNAME=Envs.MAIL_USERNAME,
    MAIL_PASSWORD=Envs.MAIL_PASSWORD,
    MAIL_FROM=Envs.MAIL_FROM,
    MAIL_PORT=Envs.MAIL_PORT,
    MAIL_SERVER=Envs.MAIL_SERVER,
    MAIL_FROM_NAME="",
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
)

# mail functions

async def send_email_async(subject: str, email_to: str, body: dict):
    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        body=body,
        subtype='html',
    )
    
    fm = FastMail(mailer)
    await fm.send_message(message, template_name='email.html')

# def send_email_background(background_tasks: BackgroundTasks, subject: str, email_to: str, body: dict):
#     message = MessageSchema(
#         subject=subject,
#         recipients=[email_to],
#         body=body,
#         subtype='html',
#     )
#     fm = FastMail(conf)
#     background_tasks.add_task(
#        fm.send_message, message, template_name='email.html')