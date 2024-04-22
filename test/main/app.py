from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def hello_world():
    user = {'username': 'Josef Emanuele'}
    return render_template('index.html', title='Home', user=user)

@app.route("/supa")
def supa():
    user = {'username': 'Supa'}
    return render_template('index.html', title='Home', user=user)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="8080")