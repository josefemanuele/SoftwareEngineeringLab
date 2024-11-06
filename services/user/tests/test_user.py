import pytest, json
from app import app 

session = 0

# Test home.
def test_index():
    response = app.test_client().get("/")
    assert b"Prenotalo!" in response.data

# Test /register.
def test_register():
    data = {"username": "frank", "password": "franco"}
    response = app.test_client().post("/register", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    assert response.data != b"{}"
    assert response.status_code == 201

# Test /login.
def test_login():
    data = {"email": "participant@prenotalo.com", "password": "password"}
    response = app.test_client().post("/login", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    global session
    session = json.loads(response.data.decode('utf-8')).get('session_id')
    assert response.status_code == 200

# Test /logout.
def test_logout():
    global session
    response = app.test_client().get("/logout/" + str(session))
    assert response.status_code == 204

# Test /sessions POST.
def test_session_create():
    data = {"email": "participant@prenotalo.com", "password": "password"}
    response = app.test_client().post("/sessions", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    global session
    session = json.loads(response.data.decode('utf-8')).get('session_id')
    assert response.data != b"{}"
    assert response.status_code == 200

# Test /sessions/<session_id> GET.
def test_session_check():
    global session
    response = app.test_client().get("/session/" + str(session))
    assert response.status_code == 200

# Test /sessions/<session_id> GET fail path.
def test_session_check_not():
    not_session = -1
    response = app.test_client().get("/session/" + str(not_session))
    assert response.status_code == 404


# Test /session/<session_id> DELETE.
def test_session_delete():
    global session
    response = app.test_client().delete("/sessions/" + str(session))
    assert response.status_code == 204

# Test /session/<session_id> DELETE fail path.
def test_session_delete_not():
    global session
    response = app.test_client().delete("/sessions/" + str(session))
    assert response.status_code == 404

# Test /users POST.
def test_users_post():
    data = {"email": "franchino@prenotalo.com", "password": "franco"}
    response = app.test_client().post("/users", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    assert response.data != b"{}"
    assert response.status_code == 201

# Test /users GET.
def test_user_get():
    user_id = 1
    response = app.test_client().get("/user/" + str(user_id))
    print(response.data.decode('utf-8'))
    user = json.loads(response.data.decode('utf-8'))
    assert user['email'] == 'participant@prenotalo.com'
    assert response.status_code == 200