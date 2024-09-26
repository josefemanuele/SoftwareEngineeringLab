from flask import Flask
from flask_restful import Api, Resource, reqparse
import json

app = Flask(__name__)
api = Api(app)

# Parsers
parser_get = reqparse.RequestParser()
parser_get.add_argument('user_id', type=int, location='args')
parser_get.add_argument('event_id', type=int, location='args')

reservation_data_parser = reqparse.RequestParser()
reservation_data_parser.add_argument('reservation_data', type=dict, location='json', required=True)

required_fields = ["transaction_id", 
                    "user_id",
                    "event_id",
                    ]

def save_data(data: dict):
    with open("data.json", "w", encoding="utf-8") as f:
        json.dump(data, f) 

def read_data() -> dict:
    data = {}

    try:
        with open("data.json", "r", encoding="utf-8") as f:
            data = json.load(f)
    except:
        with open("data.json", "w", encoding="utf-8") as f:
            json.dump(data, f)

    return data
            
def update_reservation_fields(reservation_id: int, reservations: dict):
    """This function parses the HTTP request and checks if the necessary fields
    are defined, then updates the fields of the specified reservation.  Returns 400
    BAD REQUEST if some fields are missing """

    args = reservation_data_parser.parse_args()
    new_reservation_data = args.get("reservation_data")

    updated_reservation_fields = {}

    #If all necessary fields are present, populate `updated_reservation_fields`
    for required_field in required_fields:
        if required_field not in new_reservation_data:
            # Probably it's better if this raises an exception
            return {"message": "missing fields"} , 400
        updated_reservation_fields[required_field] = new_reservation_data[required_field]

    reservations[reservation_id] = updated_reservation_fields

class Reservations(Resource):

    def get(self):

        args = parser_get.parse_args()
        user_id = args['user_id']
        event_id = args['event_id']
        
        return_dict = {}
        reservations = read_data()

        # A lot of repetitive code but for now this is enough
        if user_id is not None and event_id is not None:
            for reservation_key, reservation in reservations.items():
                if reservation["user_id"] == user_id and reservation["event_id"] == event_id:
                    return_dict[reservation_key] = reservation
            return return_dict, 200

        elif user_id is not None:
            for reservation_key, reservation in reservations.items():
                if reservation["user_id"] == user_id:
                    return_dict[reservation_key] = reservation
            return return_dict, 200

        elif event_id is not None:
            for reservation_key, reservation in reservations.items():
                if reservation["event_id"] == event_id:
                    return_dict[reservation_key] = reservation
            return return_dict, 200

        else:
            return reservations, 200
                
    # POST is for creating a new element in the collection
    def post(self):

        reservations = read_data();

        # Get id for new reservation
        if len(reservations) != 0:
            last_reservation_id = max([int(key) for key in reservations.keys()])
            new_reservation_id = last_reservation_id + 1
        else:
            new_reservation_id = 0

        # Create a new empty reservation
        reservations[new_reservation_id] = None

        # Update with data recieved by client
        update_reservation_fields(new_reservation_id, reservations)
        save_data(reservations)

        # 201 created
        return {new_reservation_id: reservations[new_reservation_id]}, 201

# This manages a single reservation
class Reservation(Resource):

    def get(self, reservation_id):

        reservations = read_data();

        if reservation_id is None:
            # 400 Bad request
            return {'message': 'missing reservation_id'}, 400

        selected_reservation = reservations.get(reservation_id)
        if selected_reservation is None:
            return {'message': 'no such reservation'}, 404

        return {reservation_id: selected_reservation}, 200
    
    def put(self, reservation_id):

        reservations = read_data()

        if reservation_id is None:
            return {'message': 'missing reservation_id'}, 400
        if reservation_id not in reservations:
            return {'message': 'no such reservation'}, 404

        update_reservation_fields(reservation_id, reservations)
        save_data(reservations)
 
        return {reservation_id: reservations[reservation_id]}, 200

    def delete(self, reservation_id):

        reservations = read_data()

        if reservation_id is None:
            # 400 Bad request
            return {'message': 'missing reservation_id'}, 400

        selected_reservation = reservations.get(reservation_id)

        if selected_reservation is not None:
            del reservations[reservation_id]
            save_data(reservations)
            return "", 200
        # 404 Not found
        return {'message': 'no such reservation'}, 404


api.add_resource(Reservations, '/reservations')
api.add_resource(Reservation, '/reservation/<int:reservation_id>')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')