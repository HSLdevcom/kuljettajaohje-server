FROM node:16-alpine

ENV WORK /opt/kuljettajaohje-server

RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies
COPY package.json ${WORK}/
RUN npm install

COPY . ${WORK}

COPY .env.production ${WORK}/.env

CMD npm run start
