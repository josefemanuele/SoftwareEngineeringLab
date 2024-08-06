from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
import db

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('event_desc', type=str)

class EventsCollection(Resource):
    def get(self):
        return db.get_all()
    
    # POST is for creating new
    def post(self):
        args = parser.parse_args()
        event_desc = args['event_desc']
        return db.create_event(event_desc)

class Event(Resource):
    # TODO: add somewhere 'get events by organization id'
    def get(self, event_id):
        return db.get_event(event_id)
    
    # PUT is for updating or replacing
    def put(self, event_id):
        args = parser.parse_args()
        event_desc = args['event_desc']
        db.update_event(event_id, event_desc)
        return '', 200
    
    def delete(self, event_id):
        db.delete_event(event_id)
        return '', 200

api.add_resource(EventsCollection, "/")
api.add_resource(Event, "/<string:event_id>")

id_counter = 2

events = {
  1 : {'organization_id' : 1, 'time' : 10, 'description' : 'Something fun'},
  2 : {'organization_id' : 2, 'time' : 12, 'description' : 'Something funnier'}
}

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')