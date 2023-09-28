import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  APP_NAME,
  API_VERSION,
  APP_DESCRIPTION,
  API_DOC_ROOT,
} from '../env.config';
import { logger } from '@src/globalServices/logger/logger.service';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(API_VERSION)
    //.setBasePath(`/${API_VERSION}/api`)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter Bearer token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);

  try {
    SwaggerModule.setup(API_DOC_ROOT, app, document);
  } catch (error) {
    logger.error(error);
  }
};
