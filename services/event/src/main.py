from flask import Flask
from flask_restful import Api, Resource, reqparse
import db

app = Flask(__name__)
id_counter = 2

<<<<<<< HEAD
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')