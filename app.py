import time

from flask import Flask , flash , jsonify , render_template , request
from flask_socketio import SocketIO

from app.rethink import getTaggedImages

# from flask.ext.session import Session


# application object
app = Flask ( __name__ )
app.config ['SESSION_TYPE'] = 'filesystem'
app.config ['SECRET_KEY'] = '45tvw5654,hj'
socketio = SocketIO ( app )
thread = None

# sess = session()

# note all of the requests are to be handled using AJAX
@app.before_request
def before_req ( ) :
	if 'localhost' in request.host_url :
		app.jinja_env.cache = { }


def background_thread ( ) :
	while True :
		socketio.emit ( 'message' , { "messsage_data" : "response" } )
		time.sleep ( 5 )


@socketio.on ( 'connect' )
def connect ( ) :
	global thread
	if thread is None :
		thread = socketio.start_background_task ( target=background_thread )


@app.route ( '/getview-data' , methods=['GET'] )
def getData ( ) :
	data = getTaggedImages ()
	return jsonify ( data )


@app.route ( '/save-data-general' , methods=['POST'] )
def getDataq ( ) :
	data: bool = True
	# <expression 1> if <condition> else <expression 2>
	return jsonify ( status='ok' if data is True else 'error' , message=data )


@app.route ( '/render' , methods=['GET'] )
def index ( ) :
	routing = request.args.get ( 'fetch' )
	flash ( routing , 'success' )
	return render_template ( 'render.html' , title=routing )


if __name__ == '__main__' :
	app.jinja_env.auto_reload = True
	app.config ['TEMPLATES_AUTO_RELOAD'] = True
	app.run ( debug=True )
# socketio.run ( app , debug=True )
