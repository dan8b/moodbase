from db import groupData
from models.groupModel import GroupData
from modules.AuthenticationModule import sendGroupInvitations

def createGroup(data:GroupData):
    groupData.insert_one({
        'name':data.name,
        'members':
    })
    return True