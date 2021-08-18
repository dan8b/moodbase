from fastapi import FastAPI

app=FastAPI()

@app.get('/')
def index():
    return "Test"

@app.get('')
def about():