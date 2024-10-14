from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
import random

app = Flask(__name__)
app.config["DEBUG"] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
id_counter = 2

users = {
  1 : {'username' : 'admin', 'password' : 'admin', 'name' : 'Admin', 'surname' : 'Admin', 'email' : 'admin@prenotalo.com'},
  2 : {'username' : 'josef' , 'password' : 'zerpa', 'name' : 'Josef Emanuele', 'surname' : 'Zerpa Ruiz', 'email' : 'zerparuiz@prenotalo.com'}
}
sessions = dict()

'''
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(16), nullable=False)
    password = db.Column(db.String(16), nullable=False)

class UserSchema(ma.Schema):
        class Meta:
            fields = ("id", "username", "password")
            model = User
'''

@app.route("/")
def hello_world():
    return "Prenotalo!"

@app.route('/getbyid/<int:id>', methods=['GET'])
def getById(id):
    global users
    match = users.get(id, {})
    return jsonify(match)

@app.route('/getbyusername/<string:username>', methods=['GET'])
def getByUsername(username):
    global users
    match = {user for id, user in users if user['username'] == username}
    return jsonify(match)

@app.route('/register', methods=['POST'])
def register():
    global users
    global id_counter
    data = request.json
    username = data['username']
    password = data['password']
    name = data['name']
    surname = data['surname']
    email = data['email']
    match = getByUsername(username)
    if (match is None):
        id_counter += 1
        '''
        new_user = User(id = id_counter, username = user, password = pwd)
        db.create_all()
        db.session.add(new_user)
        db.session.commit()
        print(UserSchema(many=True).dump(User.query.all()))
        '''
        users[id] = {'username':username, 'password':password, 'name':name, 'surname':surname, 'email':email}
        print(users)
        return jsonify(id)
    return jsonify({})

def generateSessionId():
    global sessions
    while (True):
        session_id = random.randrange(1024)
        if session_id not in sessions:
            break
    return jsonify(session_id)

@app.route('/login', methods=['POST'])
def login():
    global users
    global sessions
    data = request.json
    username = data['username']
    password = data['password']
    match = getByUsername(username)
    if (match is not None and match['password'] == password):
        session_id = generateSessionId()
        sessions[session_id] = match['id']
        return jsonify(session_id)
    return jsonify({})

@app.route('/logout/<int:session_id>', methods=['GET'])
def logout(session_id):
    global sessions
    match = sessions.get(session_id, {})
    return jsonify(match)