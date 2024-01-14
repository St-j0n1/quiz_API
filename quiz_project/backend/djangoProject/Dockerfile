FROM python:3.10-slim

RUN pip install --upgrade pip

COPY  ./requiraments.txt .
RUN pip install -r requiraments.txt

COPY . /app
WORKDIR /app

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/entrypoint.sh"]
