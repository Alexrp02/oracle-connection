FROM ghcr.io/oracle/oraclelinux8-instantclient:21
# VOLUME [ "/code/app" ]
WORKDIR /code/app
RUN yum install -y nodejs
COPY ./app/package.json ./
RUN npm install
RUN npm i express morgan
RUN npm i nodemon -D
RUN npm install -g nodemon
RUN npm install cors
WORKDIR /code/app/src
EXPOSE 3000
# CMD ["node","./api.js"]