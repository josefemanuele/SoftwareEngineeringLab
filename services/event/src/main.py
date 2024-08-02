from flask import Flask
from flask_restful import Api, Resource, reqparse
import sqlite3

app = Flask(__name__)
api = Api(app)

# Database
# I hope that this approach doesn't create concurrency issues
db_connection = sqlite3.connect(":memory:", check_same_thread=False)
# db_connection = sqlite3.connect("events.db", check_same_thread=False)
db_cursor = db_connection.cursor()

db_cursor.execute("CREATE TABLE IF NOT EXISTS Events(event_desc)")
db_connection.commit()

def get_all():
    # This returns a dictionary, would be better if it was json
    return db_cursor.execute("SELECT rowid, * FROM Events").fetchall()

def create_event(event_desc: str) -> int:
    """Creates a new event having all the parameters required.
    Returns the ID of the new event"""

    db_cursor.execute("INSERT INTO Events VALUES (?)", (event_desc, ))
    rowid = db_cursor.lastrowid
    db_connection.commit()
    return rowid

def get_event(event_id: int):
    # Using fetchall for safety but should return only one row
    return db_cursor.execute("SELECT rowid, * FROM Events WHERE rowid=(?)", (event_id, )).fetchall()

def update_event(event_id:int, event_desc: str):
    db_cursor.execute("""UPDATE Events
                      SET event_desc=(?)
                      WHERE rowid=(?)""", (event_desc, event_id))
    db_connection.commit()

def delete_event(event_id: int):
    db_cursor.execute("DELETE FROM Events WHERE rowid=(?)", (event_id, ))
    db_connection.commit()

parser = reqparse.RequestParser()
parser.add_argument('event_desc', type=str)

class EventsCollection(Resource):
    def get(self):
        return get_all()
    
    # POST is for creating new
    def post(self):
        args = parser.parse_args()
        event_desc = args['event_desc']
        return create_event(event_desc)

class Event(Resource):
    def get(self, event_id):
        return get_event(event_id)
    
    # PUT is for updating or replacing
    def put(self, event_id):
        args = parser.parse_args()
        event_desc = args['event_desc']
        update_event(event_id, event_desc)
        return '', 200
    
    def delete(self, event_id):
        delete_event(event_id)
        return '', 200

api.add_resource(EventsCollection, "/")
api.add_resource(Event, "/<string:event_id>")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
