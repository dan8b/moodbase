from itertools import filterfalse
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from models.userModel import User,ActivationModel,ResetModel
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
import modules.AuthenticationModule as auth
import modules.EmailModule as email
from schemas.userSchema import parseUser

authenticator=OAuth2PasswordBearer(tokenUrl="api/auth/login")

def gate(token:str = Depends(authenticator)):
    checked=auth.checkToken(token)
    return checked

authRoute=APIRouter(
    prefix="/api/auth",
    tags=['UserAuthentication'],
)

@authRoute.post('/testcred')
async def testing(test:str =Depends(gate)):
    return {"This":"works"}

@authRoute.post('/register')
async def registerUser(newUser: User,background_tasks:BackgroundTasks):
    emailToSend=auth.addUserToDatabase(newUser)
    background_tasks.add_task(email.sendEmailBackground,emailToSend)
    return {"success":True}

@authRoute.post('/login')
def loginUser( user: OAuth2PasswordRequestForm=Depends()): 
    print("Login again")
    checkedUser = auth.verifyUserAtLogin({'username': user.username, 'password': user.password})  
    if checkedUser==False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token=auth.createAccessToken(checkedUser['username'],{'days':0,'minutes':2})
    return {"access_token":token,"token_type":"bearer"}

@authRoute.post('/logout')
def logout(token: str = Depends(authenticator)):
    return {"delete":True}

@authRoute.post('/activate')
def activate(tokenDict:ActivationModel):
    newToken = auth.activateUser(tokenDict)
    return {"access_token":newToken, "token_type":"bearer"} 

@authRoute.post('/forgot')
async def sendResetEmail(emailObj:ResetModel,background_tasks:BackgroundTasks):
    emailToSend=auth.sendResetEmail(emailObj)
    background_tasks.add_task(email.sendEmailBackground,emailToSend)
    return {'message':f"reset email sent"}

@authRoute.post('/reset')
def reset(newPassword:ResetModel):
    auth.resetPassword(newPassword)
    return {'message':'password reset successful'}


