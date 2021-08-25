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
def registerUser(newUser: User):
    return auth.addUserToDatabase(newUser)
    
@authRoute.post('/login')
def loginUser(wantsRefresh: bool, user: OAuth2PasswordRequestForm = Depends()):
    if wantsRefresh==True:
        refreshToken=auth.createAccessToken(user.username)
        return {"access_token":refreshToken,"token_type":"bearer"}
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
