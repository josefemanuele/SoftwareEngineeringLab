from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
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

from app import routes
