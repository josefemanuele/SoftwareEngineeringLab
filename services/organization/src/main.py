from flask import Flask, jsonify, request
from flask_restful import Api, Resource

app = Flask(__name__)
id_counter = 2

organizations = {
  "barber_shop" : {'organization_id' : 1, 'owner_id' : 2},
  "sapienza": {'organization_id' : 2, 'owner_id' : 1}
}

@app.route("/")
def hello_world():
    return "Prenotalo!"

@app.route('/getall', methods=['GET'])
def get_all(user_id):
    global organizations
    return jsonify(organizations)

@app.route('/getbyuser/<int:user_id>', methods=['GET'])
def get_by_user(user_id):
    global organizations
    match = {k : v for k, v in organizations.items() if v['owner_id'] == user_id }
    return jsonify(match)

@app.route('/create', methods=['POST'])
def create():
    data = request.json
    organization = data['organization']
    owner_id = data['owner_id']
    global organizations
    match = organizations.get(organization)
    if (match is None):
        global id_counter
        id_counter += 1
        '''
        new_user = User(id = id_counter, username = user, password = pwd)
        db.create_all()
        db.session.add(new_user)
        db.session.commit()
        print(UserSchema(many=True).dump(User.query.all()))
        '''
        organizations[organization] = {"id" : id_counter, "owner_id" : owner_id}
        print(organizations)
        return "Organization created."
    
    return "Error"