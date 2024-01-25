FROM node:20-alpine

WORKDIR /usr/src/app

COPY prisma /usr/src/app/prisma

COPY package*.json ./

COPY .env . 

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
