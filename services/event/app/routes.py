from app import app
from flask import jsonify, request

events = {
  1 : {'id' : 1, 'organization_id' : 2, 'time' : 10, 'description' : 'Something fun'},
  2 : {'id' : 2, 'organization_id': 2, 'time' : 12, 'description' : 'Something funnier'}
}
id_counter = 2

@app.route('/getbyorganization/<int:organization_id>', methods=['GET'])
def getByOrganization(organization_id):
    global events
    match = {k : v for k, v in events.items() if int(v['organization_id']) == organization_id }
    return jsonify(match)

@app.route('/getupcoming/<int:time>', methods=['GET'])
def getUpcoming(time):
    global events
    match = {k : v for k, v in events.items() if int(v['time']) >= time }
    return jsonify(match)

@app.route('/create', methods=['POST'])
def create():
    global events
    global id_counter
    data = request.json
    organization_id = data['organization_id']
    time = data['time']
    description = data['description']
    id_counter += 1
    event = {'id' : id_counter, 'organization_id' : organization_id, 'time' : time, 'description' : description}
    events[id_counter] = event
    print(events)
    return jsonify(event)