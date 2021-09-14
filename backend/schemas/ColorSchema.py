from db import colorData
from models.plotModel import UserColorChange
from pprint import pprint

def createUserColorProfile(user:str):
    newColorProfile = {'user':user,'happy':'#0AB83E','sad':'#25067B'
                            ,'calm':'#73ECF0','anxious':'#D33800'}
    colorData.insert_one(newColorProfile)
    del newColorProfile['_id']
    return newColorProfile

def updateUserColorProfile(user:str,newColor:UserColorChange):
    variableName=newColor.variable
    updatedColor=newColor.newColor
    colorData.update_one({'user':user},[{'$set':{variableName:updatedColor}}])
    return True

def getPopularColors():
    var='happy'
    popularColorPipeline = [
        {
            '$sortByCount':'$'+var
        }            
    ]
    for butt in colorData.aggregate(popularColorPipeline):
        pprint(butt)
    return True