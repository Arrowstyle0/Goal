FROM node:20

WORKDIR /user/src/app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["node", "server.js"]