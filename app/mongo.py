import pymongo
import uuid
from datetime import datetime

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["mydatabase"]


def conx():
    c = pymongo.MongoClient('mongodb://localhost:27017')
    d = c['testplatform_face_recog']
    return c, d


def saveUsers(username, password):
    c, d = conx()
    table = d["users"]
    obj = {
    		"username": username, 
    		"password": password
		}
    res = table.insert_one(obj)
    return res.inserted_id


def id():
    return str(uuid.uuid4()) + '_-_' + str(uuid.uuid1())


print (saveUsers('nam33e12', 'asds332'))
