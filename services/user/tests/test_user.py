import pytest
from app import app 

def test_index():
    response = app.test_client().get("/")
    assert b"Prenotalo!" in response.data