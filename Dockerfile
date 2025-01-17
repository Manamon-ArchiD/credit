FROM node:20-alpine

ENV NODE_ENV=development
WORKDIR /api

COPY *.json .
COPY src src

RUN npm install

CMD [ "npm", "run", "start" ]
