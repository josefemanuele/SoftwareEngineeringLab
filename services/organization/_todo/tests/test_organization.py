import pytest, json
from app import app

def test_getAll():
    response = app.test_client().get("/getall")
    assert len(json.loads(response.data.decode('utf-8'))) == 2

def test_create():
    data = {"name": "Da Franco", "owner_id": 2}
    response = app.test_client().post("/create", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    assert response.data != b"{}"
    assert response.status_code == 200

def test_getByUser():
    response = app.test_client().get("/getbyuser/2")
    assert 'Sapienza' in response.data.decode('utf-8')
    assert response.status_code == 200
