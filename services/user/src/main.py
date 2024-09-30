from flask import Flask, jsonify, redirect, request
app = Flask(__name__)

@app.route('/')
def hello_flask():
    return 'Hello, Flask!'

@app.post('/token')
def r_token_create():
    data = request.json
    print(data)
    if data['username'] == 'prova' and data['password'] == 'ciao':
        response = {
            'token': 'TOKEN'
        }
        return jsonify(response), 200
    else:
        return '', 403

@app.delete('/token/{token}')
def r_token_delete():
    return '', 204


@app.post('/user')
def r_user_create():
    data = request.json
    print(data)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
