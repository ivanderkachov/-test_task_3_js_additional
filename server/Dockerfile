FROM node:14

EXPOSE 8090

WORKDIR /app

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]