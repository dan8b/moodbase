from db import groupData, userData
from models.groupModel import GroupData
from modules.AuthenticationModule import sendGroupInvitations, pwd_context
from schemas import ColorSchema, WeightSchema, PlotSchema

def createGroup(data:GroupData,adminUser:str):
    groupName=adminUser+'!!!'+data.name
    if groupData.find({'name':groupName}).limit(1).count()>0:
        return False
    groupData.insert_one({
        'name':groupName,
        'members':data.memberDict,
        'owner':adminUser,
        'password':pwd_context.hash(data.password),
        'groupWeights':data.weightButtons,
        'timeInterval':data.timeInterval,
        'timestamps':[],
        })
    # create entries in color, weight and plot dbs for the group
    WeightSchema.createWeightData(groupName)
    ColorSchema.createUserColorProfile(groupName)
    PlotSchema.createUserPlotDataDocument(groupName)
    # true if user is admin false otherwise
    for user in data.memberDict.keys():
        userData.update_one({'username':user},
            {'$set':{'groupMemberships.'+data.name:False}})
    userData.update_one({'username':data.adminUser},
            {'$set':{'groupMemberships.'+data.name:True}})
    sendGroupInvitations(data.name,data.memberDict)
    return True

def addMemberToGroup(newUserEmail:str,groupName:str):
    newMember=userData.find_one({'email':newUserEmail})['username']
    groupData.update_one(
            {'name':groupName},
            {'$set': {'members.'+newMember:False}}
            )
    return True





    