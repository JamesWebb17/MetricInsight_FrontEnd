FROM node:14

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN echo 'Installing npm and nodejs'
RUN apt-get update && apt-get install -y npm
RUN apt-get install -y nodejs

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]