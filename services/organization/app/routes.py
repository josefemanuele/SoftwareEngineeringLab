from app import app
from flask import jsonify, request
from flask_cors import cross_origin

organizations = {
  1 : {'id' : 1, 'owner_id' : 486, 'name' : 'Sapienza', 'phone' : '06 123456', 'address' : 'Piazzale Aldo Moro, 5', 'description' : 'The best university in Rome.', 'category' : 'Education'},
  2 : {'id' : 2, 'owner_id' : 2, 'name' : 'Barber Shop', 'phone' : '06 123457', 'address' : 'Via Roma, 6', 'description' : 'The best barber in Rome.', 'category' : 'Beauty'}
}
id_counter = len(organizations)

@cross_origin()
@app.route('/organizations', methods=['GET'])
def getAll():
    global organizations

    owner_id = request.args.get('owner_id')
    if owner_id == None:
        match = [ v for k, v in organizations.items() ]
        return jsonify(match)

    owner_id = int(owner_id)
    match = [ v for k, v in organizations.items() if v.get('owner_id') == owner_id ]

    return jsonify(match), 200

@cross_origin()
@app.route('/organization/<int:id>', methods=['GET'])
def getById(id):
    global organizations
    match = organizations.get(id)
    return jsonify(match)

@cross_origin()
@app.route('/organizations', methods=['POST'])
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
        organization = { "id" : id_counter, "owner_id" : owner_id, 'name' : name, 'phone' : phone, 'address' : address, 'description' : description, 'category' : category}
        organizations[id_counter] = organization
        return jsonify(organization), 201

    return ('', 404)
