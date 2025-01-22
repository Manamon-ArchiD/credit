FROM node:20-alpine AS prod

ENV NODE_ENV=production

WORKDIR /credit

COPY package.json package-lock.json tsconfig.json ./
COPY src src

RUN npm install && \
    npm run build

CMD [ "node", "/credit/dist/app.js" ]

FROM node:20-alpine AS dev

ENV NODE_ENV=development

WORKDIR /credit

COPY --from=prod /credit/src src
COPY --from=prod /credit/node_modules node_modules
COPY --from=prod /credit/*.json .
COPY .env .

RUN npm install

CMD [ "npm", "run", "dev" ]
