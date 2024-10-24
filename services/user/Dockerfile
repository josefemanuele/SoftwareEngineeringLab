FROM python:3-alpine
WORKDIR /app

COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY app .
COPY app.py .

#EXPOSE 5000

CMD ["flask", "run", "-h", "0.0.0.0"]
