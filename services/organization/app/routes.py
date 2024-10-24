from app import app
from flask import jsonify, request

organizations = {
  1 : {'id' : 1, 'owner_id' : 2, 'name' : 'Sapienza', 'phone' : '06 123456', 'address' : 'Piazzale Aldo Moro, 5', 'description' : 'The best university in Rome.', 'category' : 'Education'},
  2 : {'id' : 2, 'owner_id' : 1, 'name' : 'Barber Shop', 'phone' : '06 123457', 'address' : 'Via Roma, 6', 'description' : 'The best barber in Rome.', 'category' : 'Beauty'}
}
id_counter = 2

@app.route('/organizations', methods=['GET'])
@app.route('/getall', methods=['GET'])
def getAll():
    global organizations
    return jsonify(organizations)

@app.route('/getbyuser/<int:user_id>', methods=['GET'])
def getByUser(user_id):
    global organizations
    match = {k : v for k, v in organizations.items() if v.get('owner_id') == user_id }
    return jsonify(match)

@app.route('/organization/<int:id>', methods=['GET'])
def getById(id):
    global organizations
    match = organizations.get(id)
    return jsonify(match)

@app.route('/organizations', methods=['POST'])
@app.route('/create', methods=['POST'])
def create():
    global organizations
    data = request.json
    name = data.get('name')
    owner_id = data.get('owner_id')
    phone = data.get('phone')
    address = data.get('address')
    description = data.get('description')
    category = data.get('category')
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
        organization = { "id" : id_counter, "owner_id" : owner_id, 'name' : name, 'phone' : phone, 'address' : address, 'description' : description, 'category' : category}
        organizations[id_counter] = {id_counter : organization }
        print(organizations)
        return jsonify(organization)
    
    return ('', 404)