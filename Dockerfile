FROM node:20.11-alpine as build

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build
RUN rm -rf src/ static/ lib/

USER node:node

CMD ["node", "build/index.js"]