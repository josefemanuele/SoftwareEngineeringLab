#!/usr/bin/env python3
from flask import Flask, jsonify, redirect, request

TOKEN = 'N2WxAvqeJ3Eap7qvhxVLSL5VFxc97UEpQnWSjGWDnwk='

app = Flask(__name__)

@app.route('/')
def hello_flask():
	return 'Hello, Flask!'

@app.post('/token')
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
def r_token_delete():
	return '', 204

@app.post('/user')
def r_user_create():
	data = request.json
	print(data)
	return '', 204

@app.get('/organization')
def r_organization_get():
	response = [
	  {
		'key': 1,
		'title': 'Barber shop',
		'subtitle': 'Subtitle',
		'content': 'Description',
	  },
	  {
		'key': 2,
		'title': 'Lawyer',
		'subtitle': 'Subtitle',
		'content': 'Description',
	  },
	  {
		'key': 3,
		'title': 'Dance school',
		'subtitle': 'Subtitle',
		'content': 'Description',
	  }
	]

	return jsonify(response), 200

if __name__ == '__main__':
	app.run(debug=True, host='127.0.0.1', port=8084)
