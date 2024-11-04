from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
import json

DATA_PATH = '/data/pay.json'

app = Flask(__name__)
api = Api(app)
cors = CORS(app)

# Parsers
parser_get = reqparse.RequestParser()
parser_get.add_argument('user_id', type=int, location='args')

transaction_data_parser = reqparse.RequestParser()
transaction_data_parser.add_argument('transaction_data', type=dict, location='json', required=True)

required_fields = [ "user_id",
                    "price"
                    ]

def save_data(data: dict):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f)

def read_data() -> dict:
    data = {}

    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
    except:
        with open(DATA_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f)

    return data

def update_transaction_fields(transaction_id: int, transactions: dict):
    """This function parses the HTTP request and checks if the necessary fields
    are defined, then updates the fields of the specified transaction.
    Raise ValueError if some fields are missing """

    args = transaction_data_parser.parse_args()
    new_transaction_data = args.get("transaction_data")

    updated_transaction_fields = {}

    #If all necessary fields are present, populate `updated_transaction_fields`
    for required_field in required_fields:
        if required_field not in new_transaction_data:
            raise ValueError
            # Probably it's better if this raises an exception
            return {"message": "missing fields"} , 400
        updated_transaction_fields[required_field] = new_transaction_data[required_field]

    transactions[transaction_id] = updated_transaction_fields

#Data init
transactions = read_data()

class Payments(Resource):

    def get(self):

        args = parser_get.parse_args()
        user_id = args['user_id']

        return_dict = {}

        if user_id is not None:
            for transaction_key, transaction in transactions.items():
                if transaction["user_id"] == user_id:
                    return_dict[transaction_key] = transaction
            return return_dict, 200

        else:
            return transactions, 200

    # POST is for creating a new element in the collection
    def post(self):

        # Get id for new transaction
        if len(transactions) != 0:
            last_transaction_id = max([int(key) for key in transactions.keys()])
            new_transaction_id = last_transaction_id + 1
        else:
            new_transaction_id = 0

        # Create a new empty transaction
        transactions[new_transaction_id] = None

        # Update with data recieved by client
        try:
            update_transaction_fields(new_transaction_id, transactions)
            save_data(transactions)
        except:
            # 400 bad request
            return {"message": "missing fields"} , 400

        # 201 created
        return { 'id': new_transaction_id }, 201

class Payment(Resource):

    def get(self, transaction_id):

        if transaction_id is None:
            # 400 Bad request
            return {'message': 'missing transaction_id'}, 400

        selected_transaction = transactions.get(transaction_id)
        if selected_transaction is None:
            return {'message': 'no such transaction'}, 404

        return {transaction_id: selected_transaction}, 200

    def put(self, transaction_id):

        if transaction_id is None:
            return {'message': 'missing transaction_id'}, 400
        if transaction_id not in transactions:
            return {'message': 'no such transaction'}, 404

        update_transaction_fields(transaction_id, transactions)
        save_data(transactions)

        return {transaction_id: transactions[transaction_id]}, 200



api.add_resource(Payments, '/payments')
api.add_resource(Payment, '/payment/<int:transaction_id>')

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
