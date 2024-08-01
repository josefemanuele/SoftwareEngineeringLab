from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource

app = Flask(__name__)
app.config["DEBUG"] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
id_counter = 2
users = {
  "admin": {'id' : 1, 'pwd' : 'admin'},
  "josef": {'id' : 2, 'pwd' : 'zerpa'}
}

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), nullable=False)
    password = db.Column(db.String(16), nullable=False)

class UserSchema(ma.Schema):
        class Meta:
            fields = ("id", "username", "password")
            model = User

@app.route("/")
def hello_world():
    return "Prenotalo!"

def generateSessionId(data):
    return data['id']

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = data['user']
    pwd = data['pwd']
    global users
    match = users.get(user)
    if (match is not None and match['pwd'] == pwd):
        sessionId = generateSessionId(match)
        return jsonify(sessionId)
    return "Error"

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    user = data['user']
    pwd = data['pwd']
    global users
    match = users.get(user)
    if (match is None):
        global id_counter
        id_counter += 1
        new_user = User(id = id_counter, username = user, password = pwd)
        db.create_all()
        db.session.add(new_user)
        db.session.commit()
        print(UserSchema(many=True).dump(User.query.all()))
        users[user] = {"id" : id_counter, "pwd" : pwd}
        print(users)
        return "User registered"
    
    return "Error"