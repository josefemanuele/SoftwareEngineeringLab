from flask import Flask
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)
app.config["DEBUG"] = False
cors = CORS(app)
api = Api(app)

from app import routes
