FROM nikolaik/python-nodejs

WORKDIR /server

COPY requirements.txt ./

RUN apt install g++

RUN apt-get update && apt-get -y install libgl1-mesa-glx
RUN apt-get install -y gcc
RUN apt-get install -y python3-dev


#RUN apk add make automake gcc g++ subversion python3-dev
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY ./ ./

EXPOSE 8080

# set working directory
WORKDIR /server/client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /server/client/node_modules/.bin:$PATH

# install app dependencies
COPY ./client/package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g serve

COPY ./client/public ./public
COPY ./client/src ./src

EXPOSE 5000
RUN npm rebuild node-sass
RUN npm run build

RUN cd / && mkdir -p ./server/static/client

WORKDIR /server
RUN cp -r ./client/build ./static/client/


CMD PYTHONPATH=/server/server.py python3 server.py