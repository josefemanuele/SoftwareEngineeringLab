from app import app
from flask import jsonify, request
import random

id_counter = 2
users = {
  1 : {'id' : 1, 'username' : 'admin', 'password' : 'admin', 'name' : 'Admin', 'surname' : 'Admin', 'email' : 'admin@prenotalo.com', 'organizer' : True},
  2 : {'id' : 2, 'username' : 'josef' , 'password' : 'zerpa', 'name' : 'Josef Emanuele', 'surname' : 'Zerpa Ruiz', 'email' : 'zerparuiz@prenotalo.com', 'organizer' : True}
}
sessions = dict()

@app.route("/")
def helloWorld():
    return "Prenotalo!"

def getId(id):
    global users
    return users.get(id)

@app.route('/user/<int:id>', methods=['GET'])
@app.route('/getbyid/<int:id>', methods=['GET'])
def getById(id):
    match = getId(id)
    if (len(match) != 0):
        return jsonify({'id' : match})
    return ('', 404)

def getUsername(username):
    global users
    match = [user for id, user in users.items() if user['username'] == username]
    if (len(match) > 0):
        return match.pop()
    return None


@app.route('/getbyusername/<string:username>', methods=['GET'])
def getByUsername(username):
    return jsonify(getUsername(username))

@app.route('/users', methods=['POST'])
@app.route('/register', methods=['POST'])
def register():
    global users
    global id_counter
    data = request.json
    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    surname = data.get('surname')
    email = data.get('email')
    match = getUsername(username)
    if (match is None):
        id_counter += 1
        '''
        new_user = User(id = id_counter, username = user, password = pwd)
        db.create_all()
        db.session.add(new_user)
        db.session.commit()
        print(UserSchema(many=True).dump(User.query.all()))
        '''
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

@app.route('/session/<int:session_id>', methods=['GET'])
def checkSessionId(session_id):
    global sessions
    if session_id in sessions:
        return ('', 204)
    return ('', 404)

@app.route('/sessions', methods=['POST'])
@app.route('/login', methods=['POST'])
def login():
    global users
    global sessions
    data = request.json
    username = data.get('username')
    password = data.get('password')
    match = getUsername(username)
    if (match is not None and match['password'] == password):
        session_id = generateSessionId()
        sessions[session_id] = match['id']
        return jsonify({'session' : session_id})
    return ('', 404)

@app.route('/sessions/<int:session_id>', methods=['DELETE'])
@app.route('/logout/<int:session_id>', methods=['GET'])
def logout(session_id):
    global sessions
    match = sessions.pop(session_id, -1)
    if (match != -1):
        return jsonify({'id': match})
    return ('', 404)
