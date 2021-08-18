from fastapi import FastAPI


moodbase=FastAPI()

@moodbase.get('/')
def index():
    return "Test"

@moodbase.post('/api/testrequest')
def testRequest():
    return {"message":"received"}
    