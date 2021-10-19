from fastapi import APIRouter, Depends
from models.groupModel import GroupData
from schemas import GroupSchema
from modules.AuthenticationModule import gate, getUserFromToken

groupRoute=APIRouter(
    prefix="/api/groups",
    tags=['GroupData'],
)

@groupRoute.post('/creategroup')
def createNewGroup(newGroup: GroupData, user:str=Depends(gate)):
    GroupSchema.createGroup(newGroup,getUserFromToken(user))
    return 