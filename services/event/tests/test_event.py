import pytest, json
from app import app 


def test_create():
    data = {"organization_id": 1, "time" : 20, "description" : "Yolo."}
    response = app.test_client().post("/create", content_type='application/json',
                                      data=json.dumps(data))
    print(response.data.decode('utf-8'))
    assert 'Yolo.' in response.data.decode('utf-8')
    assert response.status_code == 200

def test_getUpcoming():
    time = 20
    response = app.test_client().get("/getupcoming/" + str(time))
    print(response.data.decode('utf-8'))
    result = json.loads(response.data.decode('utf-8'))
    assert 'Yolo.' in response.data.decode('utf-8')
    assert response.status_code == 200