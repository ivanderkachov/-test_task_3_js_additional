FROM node:14

EXPOSE 8090

WORKDIR /app

COPY . ./

RUN npm install && npm run build

RUN cd server && npm install

COPY . .

CMD ["node", "./server/index.js"]