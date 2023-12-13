# syntax=docker/dockerfile:1

FROM node:18

WORKDIR /app

# Install Sentry CLI
RUN npm install -g @sentry/cli

COPY package*.json ./

RUN npm install --force

COPY . .

# Configure Sentry authentication using the build argument
#RUN sentry-cli --auth-token $SENTRY_AUTH_TOKEN  docker build --build-arg SENTRY_AUTH_TOKEN=YOUR_ACTUAL_TOKEN -t your-image-name .

RUN npm run build:start

CMD ["npm", "run", "start:prod"]

