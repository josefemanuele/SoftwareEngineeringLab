import pytest, json
from app import app

session = 0

def test_index():
    response = app.test_client().get("/")
    assert b"Prenotalo!" in response.data

def test_register():
    data = {"username": "frank", "password": "franco"}
    response = app.test_client().post("/register", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    assert response.data != b"{}"
    assert response.status_code == 200

def test_login():
    data = {"username": "admin", "password": "admin"}
    response = app.test_client().post("/login", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    global session
    session = json.loads(response.data.decode('utf-8')).get('session')
    assert response.status_code == 200

def test_logout():
    global session
    response = app.test_client().get("/logout/" + str(session))
    print(response.data.decode('utf-8'))
    id = json.loads(response.data.decode('utf-8')).get('id')
    assert id is not None
    assert response.status_code == 200