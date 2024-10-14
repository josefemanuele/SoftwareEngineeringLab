from flask import Flask, jsonify, request
import random

app = Flask(__name__)

id_counter = 2
users = {
  1 : {'id' : 1, 'username' : 'admin', 'password' : 'admin', 'name' : 'Admin', 'surname' : 'Admin', 'email' : 'admin@prenotalo.com', 'organizer' : True},
  2 : {'id' : 2, 'username' : 'josef' , 'password' : 'zerpa', 'name' : 'Josef Emanuele', 'surname' : 'Zerpa Ruiz', 'email' : 'zerparuiz@prenotalo.com', 'organizer' : True}
}
sessions = dict()

def getId(id):
    global users
    return users.get(id)

@app.route('/user/<int:id>', methods=['GET'])
@app.route('/getbyid/<int:id>', methods=['GET'])
def getById(id):
    return jsonify({ 'id' : getId(id) })

def getUsername(username):
    global users
    match = [user for id, user in users.items() if user['username'] == username]
    if (len(match) > 0):
        return match.pop()
    return None

def generateSessionId():
    global sessions
    while (True):
        session_id = random.randrange(1024)
        if session_id not in sessions:
            break
    return session_id

def getEmail(email):
    global users
    match = [user for id, user in users.items() if user['email'] == email]
    if (len(match) > 0):
        return match.pop()
    return None

@app.route("/")
def helloWorld():
    return "Prenotalo!"

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
    match = getUsername(username)
    if (match is not None):
        id_counter += 1
        users[id_counter] = {'id' : id_counter, 'username':username, 'password':password, 'name':name, 'surname':surname, 'email':email}
        print(users)
        return jsonify({'id' : id_counter})
    return jsonify({})

@app.route('/user/<int:id>', methods=['GET'])
def getById(id):
    return jsonify({ 'id' : getId(id) })

@app.route('/session/<int:session_id>', methods=['GET'])
def checkSessionId(session_id):
    global sessions
    if session_id in sessions:
        return ('', 204)
    return ('', 404)

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
        return jsonify({'session' : session_id})
    return ('', 404)

@app.route('/session/<int:session_id>', methods=['GET'])
def checkSessionId(session_id):
    global sessions
    if session_id in sessions:
        return ('', 204)
    return ('', 404)

@app.route('/session/<int:session_id>', methods=['DELETE'])
def logout(session_id):
    global sessions
    match = sessions.pop(session_id)
    return jsonify({'id': match})

@app.post('/token')
def r_token_create():
    data = request.json
    print(data)
    if data['username'] == 'prova' and data['password'] == 'ciao':
        response = {
            'token': 'TOKEN'
        }
        return jsonify(response), 200
    else:
        return '', 403

@app.delete('/token/{token}')
def r_token_delete():
    return '', 204


@app.post('/user')
def r_user_create():
    data = request.json
    print(data)
    return '', 204

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
