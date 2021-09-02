from itertools import filterfalse
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from models.userModel import User,ActivationModel,ResetModel,TestModel
import modules.AuthenticationModule as auth
import modules.EmailModule as email
from schemas.userSchema import parseUser
from config import Secret

authRoute=APIRouter(
    prefix="/api/auth",
    tags=['UserAuthentication'],
)

@authRoute.post('/testcred')
def testing(user = Depends(auth.gate)):
    return {"This":'test'}

@authRoute.post('/register')
async def registerUser(newUser: User,background_tasks:BackgroundTasks):
    emailToSend=auth.addUserToDatabase(newUser)
    background_tasks.add_task(email.sendEmailBackground,emailToSend)
    return 

@authRoute.post('/login')
def loginUser( user: User ): 
    checkedUser = auth.verifyUserAtLogin({'username': user.username, 'password': user.password})  
    if checkedUser==False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token=auth.createAccessToken(user.username,0,0,1)
    refresh_token=auth.createAccessToken(user.username,0,8,0)
    return {"access_token":access_token,'token_type':'bearer','refresh_token':refresh_token,'token_type':'bearer'}

@authRoute.post('/logout')
def logout(token: str = Depends(auth.gate)):
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

@authRoute.post('/refresh')
def refresh(refreshToken = Depends(auth.gate)):
    newToken=auth.refresh(refreshToken)
    return newToken