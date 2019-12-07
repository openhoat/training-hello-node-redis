FROM node:12.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
