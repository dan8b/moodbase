from itertools import filterfalse
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from models.userModel import User
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
import modules.AuthenticationModule as auth

authenticator=OAuth2PasswordBearer(tokenUrl="api/auth/login")

authRoute=APIRouter(
    prefix="/api/auth",
    tags=['UserAuthentication'],
)

@authRoute.post('/register')
async def registerUser(newUser: User):
    await auth.addUserToDatabase(newUser)
    return {"success":True}
    
@authRoute.post('/login/{wantsRefresh}/{userActivation}')
def loginUser(userActivation: Optional[bool]=False, wantsRefresh: Optional[bool]=False, 
                user: OAuth2PasswordRequestForm = Depends()): 
    if userActivation==True or wantsRefresh==True:
        token=auth.createAccessToken(user.username)
        return {"access_token":token,"token_type":"bearer"}
    checkedUser = auth.verifyUserAtLogin({'username': user.username, 'password': user.password})  
    if not checkedUser:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token=auth.createAccessToken(checkedUser['username'])
    return {"access_token":token,"token_type":"bearer"}

@authRoute.post('/logout')
def logout(token: str = Depends(authenticator)):
    return {"delete":True}
