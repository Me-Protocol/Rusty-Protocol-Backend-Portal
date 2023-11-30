# syntax=docker/dockerfile:1

FROM node:16.14.2-alpine

WORKDIR /app

# Install Sentry CLI
RUN npm install -g @sentry/cli

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build:start

CMD ["npm", "run", "start:prod"]

