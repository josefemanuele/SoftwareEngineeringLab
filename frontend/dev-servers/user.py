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
}, {
	"id": 3,
	"name": "Pet Paws Grooming",
	"type": "Pet Grooming Service",
	"description": "A full-service pet grooming salon that provides bathing, cutting, and styling services for dogs and cats in a clean, welcoming environment"
}, {
	"id": 4,
	"name": "Wellness Haven Spa",
	"type": "Spa",
	"description": "A tranquil spa offering a variety of relaxing treatments, including massages, facials, and body therapies, designed to rejuvenate the mind and body"
}, {
	"id": 5,
	"name": "ABC Tutoring Center",
	"type": "Educational Tutoring",
	"description": "A tutoring center providing personalized academic support in subjects ranging from math to science for students of all grade levels"
}, {
	"id": 6,
	"name": "Fit & Fabulous Yoga Studio",
	"type": "Fitness Studio",
	"description": "A welcoming yoga studio offering a range of classes from beginner to advanced, focusing on building strength, flexibility, and inner peace"
}, {
	"id": 7,
	"name": "Elite Driving School",
	"type": "Driving School",
	"description": "A licensed driving school offering comprehensive instruction for new drivers, including both classroom training and on-road experience"
}, {
	"id": 8,
	"name": "Creative Minds Art Gallery",
	"type": "Art Studio",
	"description": "An art studio and gallery offering art classes and workshops for all ages, fostering creativity through various mediums and techniques"
}, {
	"id": 9,
	"name": "Glowing Skin Dermatology",
	"type": "Medical Practice",
	"description": "A dermatology clinic providing skin care services, including consultations, treatments, and cosmetic procedures aimed at promoting healthy skin"
}, {
	"id": 10,
	"name": "Adventure Explorers Outdoor Gear Rentals",
	"type": "Outdoor Equipment Rental",
	"description": "A rental service for outdoor gear, including camping, hiking, and water sports equipment, perfect for adventure enthusiasts looking to explore nature"
}]

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
	response = ORGANIZATION_DB
	random.shuffle(response)

	return jsonify(response), 200

if __name__ == '__main__':
	app.run(debug=False, host='0.0.0.0', port=8004)
