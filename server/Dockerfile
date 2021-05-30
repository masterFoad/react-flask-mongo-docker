FROM python:3.6-alpine

WORKDIR /server

COPY requirements.txt ./

RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
        freetype-dev \
        libpng-dev \
        jpeg-dev \
        libjpeg-turbo-dev

RUN apk add make automake gcc g++ subversion python3-dev
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY ./ ./

EXPOSE 8080

CMD PYTHONPATH=/server/server.py python3.6 server.py
