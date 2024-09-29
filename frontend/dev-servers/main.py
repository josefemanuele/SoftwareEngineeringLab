#!/usr/bin/env python3
import random

from flask import Flask, jsonify, redirect, request
from flask_cors import CORS, cross_origin

TOKEN = 'N2WxAvqeJ3Eap7qvhxVLSL5VFxc97UEpQnWSjGWDnwk='

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

ORGANIZATION_DB = [{
	"id": 1,
	"name": "Cutting Edge Barbershop",
	"type": "Barber Shop",
	"description": "A modern barbershop offering classic cuts and contemporary styles for men and boys, featuring skilled barbers and a relaxed atmosphere"
}, {
	"id": 2,
	"name": "Harmony Dance Studio",
	"type": "Dance School",
	"description": "A vibrant dance school offering classes in ballet, hip-hop, and contemporary dance for all ages, with experienced instructors to guide students"
}]

EVENT_DB = [{
  "id": 1,
  "name": "Summer Vibes Festival",
  "location": "Central Park, New York City",
  "date": "15/07/2024",
  "start_time": "17:00",
  "end_time": "22:00",
  "category": "Festival",
  "price": 50,
  "description": "Join us for a night filled with sunshine, music, and good vibes featuring top local bands.",
  "capacity": 5000
}, {
  "id": 2,
  "name": "Rock the Night Away",
  "location": "The Forum, Los Angeles",
  "date": "20/08/2024",
  "start_time": "19:30",
  "end_time": "23:00",
  "category": "Concert",
  "price": 75,
  "description": "Experience an electrifying night with your favorite rock band at one of LA's premier venues.",
  "capacity": 3000
}]

RESERVATION_DB = [{
	"id": 1,
	"event_data": EVENT_DB[0],
	"booking_data": {},
}]

@app.route('/')
@cross_origin()
def hello_flask():
	return 'Hello, Flask!'

@app.post('/sessions')
@cross_origin()
def r_token_create():
	data = request.json

	if data['email'] == 'prova@prova' and data['password'] == 'ciao':
		response = {
			'session_id': TOKEN
		}

		return jsonify(response), 200
	else:
		return '', 401

@app.delete('/session/{token}')
@cross_origin()
def r_token_delete():
	return '', 204

@app.post('/user')
@cross_origin()
def r_user_create():
	data = request.json
	print(data)
	return '', 204

@app.get('/organizations')
@cross_origin()
def r_organizations_get():
	response = ORGANIZATION_DB

	return jsonify(response), 200

@app.get('/organization/<int:id>')
@cross_origin()
def r_organization_get(id):
	response = ORGANIZATION_DB[0]

	return jsonify(response), 200

@app.get('/events')
@cross_origin()
def r_events_get():
	#response = json.loads(json.dumps(EVENT_DB))
	response = EVENT_DB

	return jsonify(response), 200

@app.get('/event/<int:id>')
@cross_origin()
def r_event_get(id):
	response = EVENT_DB[0]

	return jsonify(response), 200

@app.get('/reservations')
@cross_origin()
def r_reservations_get():
	response = RESERVATION_DB

	return jsonify(response), 200

@app.get('/reservation/<int:id>')
@cross_origin()
def r_reservation_get(id):
	response = RESERVATION_DB[0]

	return jsonify(response), 200

if __name__ == '__main__':
	app.run(debug=False, host='0.0.0.0', port=8999)
