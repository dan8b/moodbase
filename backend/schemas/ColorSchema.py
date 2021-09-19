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
    colorAggData={}
    for variable in ['family','hex']:
        if args:
            colorAggData.setdefault(variable,list(colorData.aggregate(createPopularityPipeline(args[0],variable))))
        else:
            for emotion in ['happy','sad','calm','anxious']:
                colorAggData.setdefault(emotion,{}).setdefault(variable,list(colorData.aggregate(createPopularityPipeline(emotion,variable))))
    return colorAggData

def createPopularityPipeline(emotion:str,variable:str):
    pipeline=[
                {
                    '$sortByCount':'$'+emotion+"."+variable
                },
                {
                    '$project':{'_id':0,'value':'$_id','count':1}
                },
        ]
    return pipeline

def getPopularColors():
    popularDict={'happy':{},'sad':{},'calm':{},'anxious':{}}
    for emotion, value in getColorAggregates().items():
        popularDict[emotion]['mostPopularFamily']=value['family'][0]['value']
        popularDict[emotion]['popularityCount']=value['family'][0]['count']
        if value['hex'][0]['count']>2:
            popularDict[emotion]['mostPopularHex']=value['hex'][0]
    return popularDict