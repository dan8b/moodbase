# from models.userModel import User
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from routes import auth
from fastapi.security import OAuth2PasswordBearer

authenticator=OAuth2PasswordBearer(tokenUrl="/api/auth/login")
app=FastAPI()



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

app.include_router(auth.authRoute)

@app.post('/')
def index(token: str=Depends(authenticator)):
    return {"token":"poop"}
    