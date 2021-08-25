from pymongo import MongoClient
conn = MongoClient("mongodb+srv://dan:HijikataToshiro189@moodbase1.llz9v.mongodb.net/moodbase1?retryWrites=true&w=majority")
db=conn['UserData']
userData=db['Users']
banList=db['BannedTokens']