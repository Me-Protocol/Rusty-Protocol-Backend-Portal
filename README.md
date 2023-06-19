## How to build docker

`docker build --tag nest-docker .` and run docker with `docker run --publish PORT:3000 nest-docker`

If you don't want to attach the terminal run `docker run --detach --publish PORT:3000 nest-docker`

Run with a target parameter for an environment

`docker build --target dev --tag nest-docker .`

## How to listen for file changes using docker

- Build your container `docker-compose up --build`
