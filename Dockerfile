
FROM node:18 AS development

WORKDIR /app

# Install AWS CLI
RUN apt-get update && \
    apt-get install -y awscli



COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

################
## PRODUCTION ##
################
FROM node:18 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=development /app/ .

EXPOSE 8080

# Run app
CMD [ "node", "dist/main" ]

