# ========================== Runtime Image ==========================
FROM node:16.3.0-alpine AS runtime

RUN apk update

RUN mkdir -p /blog-api

COPY ./.env ./blog-api/.env
COPY ./package.json ./blog-api/package.json
COPY ./src ./blog-api/src/

WORKDIR /blog-api/

RUN npm install --production

ENTRYPOINT ["npm", "start"]