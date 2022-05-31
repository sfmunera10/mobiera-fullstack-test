FROM node:16-alpine

ADD . /app

WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL warn

EXPOSE 3000

CMD npm run build && \
	cd server && \
	node ui.js