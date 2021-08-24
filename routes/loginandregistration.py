from fastapi import APIRouter, Depends, HTTPException, status
from models.authModel import AuthenticateUser
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from modules.AuthenticationModule import verifyUserAtLogin, createAccessToken

oauth2_scheme=OAuth2PasswordBearer(tokenUrl="loginuser")

loginAndRegistrationRoute=APIRouter(
    prefix="/api/user",
    tags=['UserAuthentication'],
)

# @loginAndRegistrationRoute.post('/registeruser')
# def registerUser(newUser: OAuth2PasswordRequestForm = Depends()):
#     return newUser.addUserToDatabase()
    
@loginAndRegistrationRoute.post('/loginuser')
def loginUser(user: OAuth2PasswordRequestForm = Depends()):
    checkedUser = verifyUserAtLogin({'username': user.username, 'password': user.password})  
    if not checkedUser:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token=createAccessToken(checkedUser['username'])
    return {"access_token":token,"token_type":"bearer"}

@loginAndRegistrationRoute.get('/test')
def index(token: str = Depends(oauth2_scheme)):
    return {"token":token}