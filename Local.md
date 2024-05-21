# Local Development with Docker

## Overview

This document provides a step-by-step guide to run the application using Docker. The application includes an API service, PostgreSQL database, Redis, Elasticsearch, LocalStack, and PgAdmin.

## Prerequisites

- Docker: Ensure you have Docker installed on your system. You can download Docker from [here](https://www.docker.com/products/docker-desktop).
- Docker Compose: Docker Compose is included with Docker Desktop for Windows and Mac. For Linux, you can install Docker Compose by following the instructions [here](https://docs.docker.com/compose/install/).

## Steps to Run the Application

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Me-Protocol/Rusty-Protocol-Backend-Portal.git backend
cd backend
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory of the project and populate it with the necessary environment variables. Use the following dummy data as an example:

```
# Postgres settings
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=mydatabase

# Elasticsearch settings
ELASTIC_NODE=http://elasticsearch:9200
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=password


# Redis settings
REDIS_HOSTNAME=redis
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=password

# Synchro
APP_SERVER_LISTEN_PORT=1450
APP_SERVER_LISTEN_IP=0.0.0.0
APP_DESCRIPTION='Me Protocol'
API_DOC_ROOT=/docs
API_VERSION=0.0.1
GLOBAL_PREFIX=v1
CLIENT_APP_URI=http://localhost:1350
APP_NAME='Me Protocol'
SERVER_MONITOR_WEBSOCKET_URL='ws://localhost:1450'
SERVER_URL=http://localhost:1450
REACT_APP_BACKEND_URL=http://localhost:1450/api
BUSINESS_APP_URL=http://localhost:1350

RUN_DEFAULT_MIGRATION=true
RUN_DB_SYNC=true

# JWT
JWT_SECRETS=somesecretkey
JWT_TIME=30d

# Twilio
TWILIO_SID=dummy_sid
TWILIO_TOKEN=dummy_token
TWILIO_PHONE_NUMBER=+1234567890

# Sendgrid
SENDGRID_API_KEY=dummy_sendgrid_api_key
SENDGRID_EMAIL=noreply@example.com
SENDGRID_BRAND_CONTACT_LIST_ID=dummy_contact_list_id
SENDGRID_USER_CONTACT_LIST_ID=dummy_user_contact_list_id

# ElasticMail
ELASTIC_MAIL_USERNAME=dummy_username
ELASTIC_MAIL_PASSWORD=dummy_password

# Twitter
TWITTER_CONSUMER_KEY=dummy_consumer_key
TWITTER_CONSUMER_SECRET=dummy_consumer_secret
TWITTER_CALLBACK_URL=http://localhost:1350/user/twitter/callback
TWITTER_CLIENT_ID=dummy_client_id
TWITTER_BEARER_TOKEN=dummy_bearer_token
TWITTER_LINK_CALLBACK_URL=http://127.0.0.1:1350/user/link_twitter/callback

# Facebook
FACEBOOK_CLIENT_ID=dummy_facebook_client_id
FACEBOOK_REDIRECT_URI=http://localhost:1350/user/facebook/callback
FACEBOOK_SECRET=dummy_facebook_secret

# Google
GOOGLE_CLIENT_ID=dummy_google_client_id
GOOGLE_CLIENT_SECRET=dummy_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:1450/user/google/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=dummy_cloud_name
CLOUDINARY_API_KEY=dummy_cloudinary_api_key
CLOUDINARY_API_SECRET=dummy_cloudinary_api_secret



# General
COUPON_CODE_PREFIX=MEPRO
TNX_PREFIX=MEPRO

TASK_QUEUE=task-queue

# Redis
REDIS_PREFIX=MEPRO
REDIS_TTL=86400

# Default images
EXPIRING_NOTIFICATION_ICON=https://dummy-icon-url.com
BOOKMARK_IMAGE_URL=https://dummy-bookmark-url.com


```

### 3. Build and Start the Services

Use Docker Compose to build and start the services:

```bash
docker-compose up --build
```

This command will:

- Build the `api` service using the specified Dockerfile.
- Start the `postgres`, `redis`, `elasticsearch`, `localstack`, and `pgadmin` services.
- Map ports as defined in the `docker-compose.yml` file.

### 4. Access the Services

- **API Service**: Available at `http://localhost:1450`.
- **PostgreSQL**: No direct access, but PgAdmin can be used to manage it.
- **PgAdmin**: Available at `http://localhost:80`. Login with `admin@docker.ai` and `password`.
- **Redis**: No direct access, but connected to the API service.
- **Elasticsearch**: Available at `http://localhost:9200`.
- **LocalStack**: Available at `http://localhost:4566`.

### 5. Stopping the Services

To stop the services, use the following command:

```bash
docker-compose down
```

This will stop and remove all containers defined in the `docker-compose.yml` file.

### 6. Running in Production

For running the application in production mode, ensure that the `NODE_ENV` variable is set to `production` in your `.env` file and use the production target in the Dockerfile. Update your `docker-compose.yml` if necessary to use the production target.

## Troubleshooting

- **Ports in Use**: If you encounter errors about ports being in use, ensure that no other applications are using the specified ports or modify the `docker-compose.yml` to use different ports.
- **Database Connection**: Ensure that the environment variable is correctly set and that the database container is running.
- **Elasticsearch Issues**: Check the logs of the Elasticsearch container for any issues.

## Conclusion

Following these steps will set up and run the application using Docker. For further customization and environment-specific configurations, modify the `docker-compose.yml` and `.env` files as needed.
