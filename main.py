# from models.userModel import User
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from routes import loginandregistration
from fastapi.security import OAuth2PasswordBearer

app=FastAPI()
oauth2_scheme= OAuth2PasswordBearer(tokenUrl="loginuser")

origins=[
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(loginandregistration.loginAndRegistrationRoute)

@app.get('/')
def index(token: str = Depends(oauth2_scheme)):
    return {"token":token}
    