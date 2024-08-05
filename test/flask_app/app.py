from flask import Flask, jsonify, request
from flask_restful import Api, Resource

app = Flask(__name__)
id_counter = 2

events = {
  1 : {'organization_id' : 1, 'time' : 10, 'description' : 'Something fun'},
  2 : {'organization_id' : 2, 'time' : 12, 'description' : 'Something funnier'}
}

@app.route("/")
def hello_world():
    return "Prenotalo!"

@app.route('/getbyorganization/<int:organization_id>', methods=['GET'])
def get_by_user(organization_id):
    global events
    match = {k : v for k, v in events.items() if int(v['organization_id']) == organization_id }
    return jsonify(match)

@app.route('/create', methods=['POST'])
def create():
    data = request.json
    organization_id = data['organization_id']
    time = data['time']
    description = data['description']
    global id_counter
    id_counter += 1
    global events
    events[id_counter] = {'organization_id' : organization_id, 'time' : time, 'description' : description},
    print(events)
    return "Event created."
    