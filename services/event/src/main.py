from flask import Flask
from flask_restful import Api, Resource, reqparse

# import db

app = Flask(__name__)
api = Api(app)

# Parsers
parser = reqparse.RequestParser()
parser.add_argument('organization_id', type=int, location='args')

event_data_parser = reqparse.RequestParser()
event_data_parser.add_argument('event_data', type=dict, location='json', required=True)

# required_event_fields = ["organization_id", "title", "description"]

required_event_fields = ["organization_id", 
                         "title",
                         "description",
                         "date",
                         "start_time",
                         "end_time",
                         "price",
                         "capacity"]

# Dummy data
events = {
    0 : {
        "organization_id": 1,
        "title": "Event",
        "description": "A nice event",
    },
    1 : {
        "organization_id": 1,
        "title": "Another event",
        "description": "The best event ever",
    },
    2 : {
        "organization_id": 2,
        "title": "Happy Hour",
        "description": "The best live music is here!",
    },
}

def update_event_fields(event_id: int):
    """This function parses the HTTP request and checks if the necessary fields
    are defined, then updates the fields of the specified event.  Returns 400
    BAD REQUEST if some fields are missing """

    args = event_data_parser.parse_args()
    event_data = args.get("event_data")

    updated_event_fields = {}

    #If all necessary fields are present, populate `updated_event_fields`
    for required_field in required_event_fields:
        if required_field not in event_data:
            # Probably it's better if this raises an exception
            return {"message": "missing fields"} , 400
        updated_event_fields[required_field] = event_data[required_field]

    events[event_id] = updated_event_fields

# This manages event collection
class Events(Resource):

    def get(self):

        args = parser.parse_args()
        organization_id = args.get("organization_id")

        if organization_id is None:
            # If no organization_id is defined, show all events
            return events, 200
        else:
            # Show only events that have the requested organization_id
            selected_events = {}

            for event_id, event_data in events.items():
                if event_data["organization_id"] == organization_id:
                    selected_events[event_id] = event_data

            return_code = 200
            if len(selected_events) == 0:
               return_code = 404

            return selected_events, return_code

    # POST is for creating a new element in the collection
    def post(self):

        if len(events) != 0:
            last_event_id = max(events.keys())
            new_event_id = last_event_id + 1
        else:
            new_event_id = 0

        events[new_event_id] = None
        update_event_fields(new_event_id)

        # 201 created
        return {new_event_id: events[new_event_id]}, 201


# This manages a single event
class Event(Resource):

    def get(self, event_id):

        if event_id is None:
            # 400 Bad request
            return {'message': 'missing event_id'}, 400

        selected_event = events.get(event_id)
        if selected_event is None:
            return {'message': 'no such event'}, 404

        return {event_id: selected_event}, 200
    
    def put(self, event_id):

        if event_id is None:
            return {'message': 'missing event_id'}, 400
        if event_id not in events:
            return {'message': 'no such event'}, 404

        update_event_fields(event_id)
 
        return {event_id: events[event_id]}, 200

    def delete(self, event_id):

        if event_id is None:
            # 400 Bad request
            return {'message': 'missing event_id'}, 400

        selected_event = events.get(event_id)

        if selected_event is not None:
            del events[event_id]
            return "", 200
        # 404 Not found
        return {'message': 'no such event'}, 404


api.add_resource(Events, '/events')
api.add_resource(Event, '/event/<int:event_id>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')