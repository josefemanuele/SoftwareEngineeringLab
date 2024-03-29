FROM python:3-alpine
WORKDIR /data

COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY src .

CMD [ "/usr/local/bin/python", "/data/hello-flask.py" ]
