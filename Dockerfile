FROM node:alpine

RUN mkdir -p /usr/src/vue-app && chown -R node:node /usr/src/vue-app

WORKDIR /usr/src/vue-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 8080

CMD ["yarn", "serve"]
