#!/usr/bin/env python3
from flask import Flask, jsonify, redirect, request
from flask_cors import CORS, cross_origin

TOKEN = 'N2WxAvqeJ3Eap7qvhxVLSL5VFxc97UEpQnWSjGWDnwk='

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello_flask():
	return 'Hello, Flask!'

@app.post('/token')
@cross_origin()
def r_token_create():
	data = request.json

	if data['email'] == 'prova@prova' and data['password'] == 'ciao':
		response = {
			'token': TOKEN
		}

		return jsonify(response), 200
	else:
		return '', 403

@app.delete('/token/{token}')
@cross_origin()
def r_token_delete():
	return '', 204

@app.post('/user')
@cross_origin()
def r_user_create():
	data = request.json
	print(data)
	return '', 204

@app.get('/organization')
@cross_origin()
def r_organization_get():
	response = [
	  {
		'id': 1,
		'title': 'Barber shop',
		'subtitle': 'Subtitle',
		'content': 'Description',
	  },
	  {
		'id': 2,
		'title': 'Lawyer',
		'subtitle': 'Subtitle',
		'content': 'Description',
	  },
	  {
		'id': 3,
		'title': 'Dance school',
		'subtitle': 'Subtitle',
		'content': 'Description',
	  }
	]

	return jsonify(response), 200

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=8084)
