import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { jwtConfigurations } from "./config/jwt.config";
import * as session from "express-session";
import { logger } from "./modules/logger/logger.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary_1 = require("cloudinary");

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  APP_SERVER_LISTEN_PORT,
  APP_SERVER_LISTEN_IP,
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: jwtConfigurations.secret,
      saveUninitialized: true,
      resave: true,
    })
  );

  await app.listen(APP_SERVER_LISTEN_PORT, APP_SERVER_LISTEN_IP);

  cloudinary_1.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  logger.warn(`Application is now running on: ${await app.getUrl()}`);
  console.log(`Application is now running on: ${await app.getUrl()}`);
}
bootstrap();
