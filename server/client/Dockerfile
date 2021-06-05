FROM node:14.11.0-alpine

# set working directory
WORKDIR /client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install -g serve

COPY ./public ./public
COPY ./src ./src

EXPOSE 5000

CMD npm run build
COPY ./build ./build

RUN cd / && cp -r ./client/build ./static/common/

#CMD npm run build && serve -s build
#CMD ["npm", "run", "start"]