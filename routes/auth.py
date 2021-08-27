from itertools import filterfalse
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from models.userModel import User, AdditionalAuthenticationInfo 
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
import modules.AuthenticationModule as auth
from schemas.userSchema import parseUser

authenticator=OAuth2PasswordBearer(tokenUrl="api/auth/login")

authRoute=APIRouter(
    prefix="/api/auth",
    tags=['UserAuthentication'],
)

@authRoute.post('/register')
async def registerUser(newUser: User):
    await auth.addUserToDatabase(newUser)
    return {"success":True}
    

@authRoute.post('/login')
def loginUser( user: OAuth2PasswordRequestForm=Depends()): 
    # if additionalInformation is not None:
    #     if additionalInformation.activationToken!="":
    #         userToActivate=auth.getUserFromToken(additionalInformation.activationToken)
    #         parseUser(userToActivate).activateUser()
    #         return {"access_token":additionalInformation.activationToken ,"token_type":"bearer"}
    #     elif additionalInformation.wantsRefresh==True:
    #         return {"access_token":additionalInformation.activationToken ,"token_type":"bearer"}
    #     else:
    #         raise HTTPException(
    #             status_code=status.HTTP_418_IM_A_TEAPOT,
    #             detail="Something happened",
    #             headers={"WWW-Authenticate":"Bearer"}
    checkedUser = auth.verifyUserAtLogin({'username': user.username, 'password': user.password})  
    if checkedUser==False:
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
