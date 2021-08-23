from fastapi import APIRouter
from models.userModel import UserForLogin,UserForRegistration

loginAndRegistrationRoute=APIRouter(
    prefix="/api/user",
    tags=['UserAuthentication'],
)

@loginAndRegistrationRoute.post('/registeruser')
def registerUser(newUser: UserForRegistration):
    return newUser.addUserToDatabase()
    
@loginAndRegistrationRoute.post('/loginuser')
def loginUser(userToLogin: UserForLogin):
    return userToLogin.loginUser()
