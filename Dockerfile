FROM node:carbon

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
