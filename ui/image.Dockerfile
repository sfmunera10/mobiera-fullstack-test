FROM node:16-alpine

ADD . /app

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 3001

CMD npm install && \
	cd server && \
	node images.js