#!/usr/bin/env python3
import json
import random

from flask import Flask, jsonify, redirect, request
from flask_cors import CORS, cross_origin

TOKEN = 'N2WxAvqeJ3Eap7qvhxVLSL5VFxc97UEpQnWSjGWDnwk='

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

EVENT_DB = [{
  "id": 1,
  "name": "Summer Vibes Festival",
  "location": "Central Park, New York City",
  "date": "July 15, 2024",
  "start_time": "5:00 PM",
  "end_time": "10:00 PM",
  "category": "Festival",
  "price": 50,
  "description": "Join us for a night filled with sunshine, music, and good vibes featuring top local bands.",
  "participants": 5000
}, {
  "id": 2,
  "name": "Rock the Night Away",
  "location": "The Forum, Los Angeles",
  "date": "August 20, 2024",
  "start_time": "7:30 PM",
  "end_time": "11:00 PM",
  "category": "Concert",
  "price": 75,
  "description": "Experience an electrifying night with your favorite rock band at one of LA's premier venues.",
  "participants": 3000
}, {
  "id": 3,
  "name": "Acoustic Under the Stars",
  "location": "Riverside Amphitheater, Chicago",
  "date": "September 10, 2024",
  "start_time": "6:00 PM",
  "end_time": "9:00 PM",
  "category": "Acoustic",
  "price": 40,
  "description": "Enjoy an intimate acoustic set surrounded by nature's beauty as the sun sets.",
  "participants": 1500
}, {
  "id": 4,
  "name": "Fall Fest Music Bash",
  "location": "Orchard Park, Denver",
  "date": "October 5, 2024",
  "start_time": "3:00 PM",
  "end_time": "8:00 PM",
  "category": "Festival",
  "price": 35,
  "description": "Celebrate the season with music, food trucks, and fun activities for the whole family!",
  "participants": 3500
}, {
  "id": 5,
  "name": "Winter Wonderland Concert",
  "location": "Snow Dome, Minneapolis",
  "date": "December 15, 2024",
  "start_time": "7:00 PM",
  "end_time": "10:00 PM",
  "category": "Holiday",
  "price": 60,
  "description": "Experience the spirit of the holidays with festive music and special guest performances.",
  "participants": 2000
}, {
  "id": 6,
  "name": "Spring Awakening Concert",
  "location": "Blossom Music Center, Ohio",
  "date": "April 22, 2025",
  "start_time": "5:30 PM",
  "end_time": "9:30 PM",
  "category": "Concert",
  "price": 45,
  "description": "Celebrate the arrival of spring with an outdoor concert featuring beloved local artists.",
  "participants": 4000
}, {
  "id": 7,
  "name": "Country Jam Night",
  "location": "Grand Ole Opry, Nashville",
  "date": "May 18, 2025",
  "start_time": "8:00 PM",
  "end_time": "11:30 PM",
  "category": "Country",
  "price": 80,
  "description": "A night filled with country hits and classic favorites from top artists in the genre.",
  "participants": 2000
}, {
  "id": 8,
  "name": "Indie Night Out",
  "location": "The Echo, Los Angeles",
  "date": "June 30, 2025",
  "start_time": "9:00 PM",
  "end_time": "1:00 AM",
  "category": "Indie",
  "price": 30,
  "description": "Discover new sounds from up-and-coming indie artists in an eclectic venue.",
  "participants": 800
}, {
  "id": 9,
  "name": "Jazz Soiree",
  "location": "Blue Note, New York City",
  "date": "March 14, 2025",
  "start_time": "8:00 PM",
  "end_time": "10:00 PM",
  "category": "Jazz",
  "price": 55,
  "description": "A night of smooth tunes and improvisational magic from renowned jazz musicians.",
  "participants": 1200
}, {
  "id": 10,
  "name": "Classical Evenings",
  "location": "Sydney Opera House, Sydney",
  "date": "August 25, 2025",
  "start_time": "6:30 PM",
  "end_time": "9:00 PM",
  "category": "Classical",
  "price": 100,
  "description": "Experience a mesmerizing evening with the city's finest orchestra in an iconic setting.",
  "participants": 1800,
}]

@app.route('/')
@cross_origin()
def hello_flask():
	return 'Hello, Flask!'

@app.get('/organization/<id>/event')
@cross_origin()
def r_organization_event_get(id):
	print('Organization id: ', id)

	#response = json.loads(json.dumps(EVENT_DB))
	response = EVENT_DB

	random.shuffle(response)

	return jsonify(response), 200

if __name__ == '__main__':
	app.run(debug=False, host='0.0.0.0', port=8000)
