FROM node:20-alpine

ENV WORK /opt/kuljettajaohje-server

RUN mkdir -p ${WORK}
WORKDIR ${WORK}

# Install app dependencies
COPY package.json package-lock.json ${WORK}/
RUN npm ci

COPY . ${WORK}

COPY .env.production ${WORK}/.env

CMD npm run start
