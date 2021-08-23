from fastapi import APIRouter
from models.authModel import AuthenticateUser

loginAndRegistrationRoute=APIRouter(
    prefix="/api/user",
    tags=['UserAuthentication'],
)

@loginAndRegistrationRoute.post('/registeruser')
def registerUser(newUser: AuthenticateUser):
    return newUser.addUserToDatabase()
    
@loginAndRegistrationRoute.post('/loginuser')
def loginUser(userToLogin: AuthenticateUser):
    return userToLogin.loginUser()
