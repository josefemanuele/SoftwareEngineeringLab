FROM python:3-alpine
WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY src .

CMD [ "/usr/local/bin/python", "/app/hello-flask.py" ]
