# syntax=docker/dockerfile:1

FROM node:16.14.2-alpine

WORKDIR /app

# Install Yarn
RUN npm install -g yarn

# Install Sentry CLI globally
RUN yarn global add @sentry/cli

COPY package*.json yarn.lock ./

RUN yarn install --force

COPY . .

RUN yarn run build

CMD ["yarn", "run", "start:prod"]

