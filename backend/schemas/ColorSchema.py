from db import colorData
from models.plotModel import UserColorChange

def createUserColorProfile(user:str):
    newColorProfile = {'user':user,'colors':{'happy':'#0AB83E','sad':'#25067B'
                            ,'calm':'#73ECF0','anxious':'#D33800'}}
    colorData.insert_one(newColorProfile)
    return newColorProfile['colors']

def updateUserColorProfile(user:str,newColor:UserColorChange):
    variableName=newColor.variable
    updatedColor=newColor.newColor
    colorData.update_one({'user':user},[{'$set':{'colors':{variableName:updatedColor}}}])
    return True

# def getPopularColors():
#     popularColorPipeline = [
#         {
#             '$group'{

#             }
#         }
#     ]
#     return popularColors