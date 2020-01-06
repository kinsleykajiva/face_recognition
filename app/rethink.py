import uuid
from datetime import datetime

from rethinkdb import RethinkDB


def conx ( ) :
	r = RethinkDB ()
	return r , r.connect ( db='testplatform_face_recog' ).repl ()


def id ( ) :
	return str ( uuid.uuid4 () ) + '_-_' + str ( uuid.uuid1 () )


def getAllUsers ( ) :
	r , c = conx ()


def getUser ( id ) :
	r , c = conx ()


def saveUser ( ) :
	r , c = conx ()


# r.table("users").filter(
#     r.row("age").lt(18)
# ).update({age: 18})
# r.table("posts").get(1).update({"status": "published"}).run(conn)


def updateTagImagesPerson ( id_record , ids_imagesArr ) :
	r , c = conx ()
	res = r.table ( 'tag_person' ).get (
		(id_record)
	).update ( { "id_images" : ids_imagesArr } ).run ( c )
	return res ['replaced'] > 0


def tagImagesToPerson ( name , surname , alias_nickname , ids_imagesArr,sex,notes ) :
	r , c = conx ()
	obj = {
		"name" : name ,
		"surname" : surname ,
		"sex" : sex ,
		"alias_nickname" : alias_nickname ,
		"date_created" : nowToday () ,
		"notes" : notes ,
		"id_images" : ids_imagesArr
	}
	res = r.table ( 'tag_person' ).insert ( obj ).run ( c )
	return res ['inserted'] > 0


def getTaggedImages ( ) :
	r , c = conx ()
	return list ( r.table ( 'tag_person' ).run ( c ) )

# def tagImagesToPerson (name,surname,alias_nickname ) :
# 	r , c = conx ()
#     obj = { "id":id() , "name":name,  "surname":surname,  "alias_nickname":alias_nickname,  "date_created":'2'  }
#     return 2


def nowToday ( ) :
	""":return Y-M-D H:MM:ss"""
	return f'{datetime.now ():%Y-%m-%d %H:%M:%S%z}'


def saveImageFile ( filePath ) :
	r , c = conx ()
	date1 = datetime.now ()
	date1 = date1.ctime ()
	obj = { "id" : id () , "path" : filePath , "date_one" : date1 ,
	        "date_two" : nowToday () }
	res = r.table ( 'faces_images' ).insert ( obj ).run ( c )
	return res ['inserted'] > 0


def getImageFiles ( ) :
	r , c = conx ()
	return list ( r.table ( 'faces_images' ).run ( c ) )


if __name__ == "__main__" :
	# usersList = list ( r.table ( 'users' ).run ( conx() ) )
	print (getTaggedImages())
	# print (usersList[0]['id'])
	# print ( updateTagImagesPerson ( '809f5ee9-b016-4e83-99a9-e36debf3fbb0' , [id () , id () , id () , id ()] ) )
	for x in range ( 1 ) :
		pass
		# print ( tagImagesToPerson( 'name','surname','alias_nickname',[id(),id(),id(),id(),id(),id(),id(),id()] ) )
	
	# for doc in r.table('users').run(conn):
	#     print (doc.id)
