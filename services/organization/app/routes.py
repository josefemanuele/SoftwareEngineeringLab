from app import app
from flask import jsonify, request

organizations = {
  1 : {'id' : 1, 'owner_id' : 2, 'name' : 'Sapienza'},
  2 : {'id' : 2, 'owner_id' : 1, 'name' : 'Barber Shop'}
}
id_counter = 2

@app.route('/getall', methods=['GET'])
def getAll():
    global organizations
    return jsonify(organizations)

@app.route('/getbyuser/<int:user_id>', methods=['GET'])
def getByUser(user_id):
    global organizations
    match = {k : v for k, v in organizations.items() if v.get('owner_id') == user_id }
    return jsonify(match)

@app.route('/create', methods=['POST'])
def create():
    global organizations
    data = request.json
    name = data['name']
    owner_id = data['owner_id']
    match = {k : v for k, v in organizations.items() if v['name'] == name }
    if (len(match) == 0):
        global id_counter
        id_counter += 1
        '''
        new_user = User(id = id_counter, username = user, password = pwd)
        db.create_all()
        db.session.add(new_user)
        db.session.commit()
        print(UserSchema(many=True).dump(User.query.all()))
        '''
        organization = { "id" : id_counter, "owner_id" : owner_id, 'name' : name }
        organizations[id_counter] = {id_counter : organization }
        print(organizations)
        return jsonify(organization)
    
    return jsonify(None)