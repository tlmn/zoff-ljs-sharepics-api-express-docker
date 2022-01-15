FROM node:alpine

RUN apk add chromium

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

CMD [ "node", "app.js" ]

EXPOSE 3000