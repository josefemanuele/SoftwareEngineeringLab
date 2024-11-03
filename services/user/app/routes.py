from app import app
from flask import jsonify, request
from flask_cors import cross_origin
import random

users = {
  1 : {'id' : 1, 'username' : 'participant' , 'password' : 'password', 'name' : 'Participant', 'surname' : 'User', 'email' : 'participant@prenotalo.com', 'organizer' : False},
  2 : {'id' : 2, 'username' : 'organizer' , 'password' : 'password', 'name' : 'Organizer', 'surname' : 'User', 'email' : 'organizer@prenotalo.com', 'organizer' : True},
}
id_counter = len(users)
sessions = dict()

@cross_origin()
@app.route("/")
def helloWorld():
    return "Prenotalo!"

def getId(id):
    global users
    return users.get(id)

@cross_origin()
@app.route('/user/<int:id>', methods=['GET'])
def getById(id):
    match = getId(id)
    if (len(match) != 0):
        return jsonify(match), 200
    return ('', 404)

def getEmail(email):
    global users
    match = [ user for id, user in users.items() if user['email'] == email ]
    if (len(match) > 0):
        return match.pop()
    return None

@cross_origin()
@app.route('/users', methods=['POST'])
def register():
    global users
    global id_counter
    data = request.json
    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    surname = data.get('surname')
    email = data.get('email')
    match = getEmail(email)
    if (match is None):
        id_counter += 1
        users[id_counter] = {'id' : id_counter, 'username':username, 'password':password, 'name':name, 'surname':surname, 'email':email}
        print(users)
        return jsonify({'id' : id_counter})
    return ('', 404)

def generateSessionId():
    global sessions
    while (True):
        session_id = random.randrange(1024)
        if session_id not in sessions:
            break
    return session_id

@cross_origin()
@app.route('/session/<int:session_id>', methods=['GET'])
def checkSessionId(session_id):
    global sessions
    if session_id in sessions:
        return ({'user_id': sessions[session_id]}, 200)
    return ('', 404)

@cross_origin()
@app.route('/sessions', methods=['POST'])
def login():
    global users
    global sessions
    data = request.json
    email = data.get('email')
    password = data.get('password')
    match = getEmail(email)
    if (match is not None and match['password'] == password):
        session_id = generateSessionId()
        sessions[session_id] = match['id']
        return jsonify({'session_id' : session_id, 'user_id': match['id']}), 200
    return ('', 401)

@cross_origin()
@app.route('/sessions/<int:session_id>', methods=['DELETE'])
def logout(session_id):
    global sessions
    match = sessions.pop(session_id, -1)
    if (match != -1):
        return jsonify({'id': match})
    return ('', 404)
