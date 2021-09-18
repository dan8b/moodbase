from db import colorData
from models.plotModel import UserColorChange

def createUserColorProfile(user:str):
    newColorProfile = {'user':user,
                        'happy':{'family':"green",'hex':"#0AB83E"},
                        'sad':{'family':"purple",'hex':'#25067B'},
                        'calm':{'family':"blue",'hex':'#73ECF0'},
                        'anxious':{'family':"orange",'hex':'#D33800'},
    }
    colorData.insert_one(newColorProfile)
    del newColorProfile['_id']
    return newColorProfile

def updateUserColorProfile(user:str,newColor:UserColorChange):
    colorData.update_one({'user':user},[{'$set':{newColor.variable:newColor.colorChange}}])
    return True

def getColorAggregates(*args):
    colorAggData={'happy':{'family':[],'hex':[]},'sad':{'family':[],'hex':[]},
                 'calm':{'family':[],'hex':[]},'anxious':{'family':[],'hex':[]}}
    for variable in ['family','hex']:
        if args:
            popularColorPipeline =[
                    {
                        '$sortByCount':'$'+args[0]+"."+variable
                    },
                    {
                        '$project':{'_id':0,'value':'$_id','count':1}
                    },
                ]
            colorAggData[args[0]][variable]=list(colorData.aggregate(popularColorPipeline))
        else:
            for emotion in ['happy','sad','calm','anxious']:
                popularColorPipeline = [
                        {
                            '$sortByCount':'$'+emotion+"."+variable
                        },
                        {
                            '$project':{'_id':0,'value':'$_id','count':1}
                        },
                    ]
                colorAggData[emotion][variable]=list(colorData.aggregate(popularColorPipeline))
    return colorAggData

def getPopularColors():
    popularDict={'happy':{},'sad':{},'calm':{},'anxious':{}}
    for emotion, value in getColorAggregates().items():
        popularDict[emotion]['mostPopularFamily']=value['family'][0]['value']
        popularDict[emotion]['popularityCount']=value['family'][0]['count']
        if 'hex' in value.keys() and value['hex'][0]['count']>2:
            popularDict[emotion]['mostPopularHex']=value['hex'][0]
    return popularDict