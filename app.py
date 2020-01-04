from flask import Flask , flash , render_template , request

# from flask.ext.session import Session


# application object
app = Flask ( __name__ )
app.config ['SESSION_TYPE'] = 'filesystem'
app.config ['SECRET_KEY'] = '45tvw5654,hj'


# sess = session()

# note all of the requests are to be handled using AJAX
@app.before_request
def before_req ( ) :
	if 'localhost' in request.host_url :
		app.jinja_env.cache = { }


@app.route ( '/render' , methods=['GET'] )
def index ( ) :
	routing = request.args.get ( 'fetch' )
	flash ( routing , 'success' )
	return render_template ( 'render.html' , title=routing )


if __name__ == '__main__' :
	app.jinja_env.auto_reload = True
	app.config ['TEMPLATES_AUTO_RELOAD'] = True
	app.run ( debug=True )
