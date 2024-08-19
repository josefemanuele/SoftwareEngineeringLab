from flask import Flask
from flask_restful import Api, Resource, reqparse
import db

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('event_desc', type=str)
parser.add_argument('organization_id', type=int, location='args')
parser.add_argument('event_data', type=dict, location='json')

class EventsCollection(Resource):

    def get(self):

        args = parser.parse_args()
        organization_id = args.organization_id

        if organization_id is not None:
                return db.get_all_events_by_organization_id(organization_id)
        else:
            return db.get_all_events()
    
    # POST is for creating a new event
    def post(self):

        args = parser.parse_args()

        print(args.event_data)

        if args.event_data is None:
            # 400: Bad request
            return '', 400 
        
        event_data = args.event_data
        # 201: Created
        try:
            new_event_id = db.create_event(**event_data)
            return new_event_id, 201
        except ValueError:
            return '', 400

class Event(Resource):
    def get(self, event_id):
        return db.get_event_by_id(event_id)
    
    # PUT is for updating or replacing
    def put(self, event_id):
        args = parser.parse_args()
        event_desc = args['event_desc']
        db.update_event(event_id, event_desc)
        return '', 200
    
    def delete(self, event_id):
        db.delete_event(event_id)
        return '', 200

api.add_resource(EventsCollection, "/events")
api.add_resource(Event, "/event/<string:event_id>")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')