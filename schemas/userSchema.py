def parseUser(user) -> dict:
    return{
        "id":str(user['_id']),
        "username":user['username'],
        "email":user['email'],
        "password":user['password'],
        "active":user['active']
    }