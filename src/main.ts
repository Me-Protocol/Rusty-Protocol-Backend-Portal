import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './globalServices/logger/logger.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { setupSwagger } from './config/swagger/swagger.config';
import {
  APP_SERVER_LISTEN_PORT,
  APP_SERVER_LISTEN_IP,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from './config/env.config';
import { TracingInterceptor } from './interceptors/tracing.interceptor';
import helmet from 'helmet';
import { NestExpressApplication } from '@node_modules/@nestjs/platform-express';

import cloudinary from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  /**
   * Interceptors
   */
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TracingInterceptor());

  // Conditionally setup swagger
  if (process.env.NODE_ENV === 'development') {
    setupSwagger(app);
  }

  app.enableCors();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`, 'unpkg.com'],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
            'unpkg.com',
            'cdnjs.cloudflare.com',
          ],
          fontSrc: [
            `'self'`,
            'fonts.gstatic.com',
            'cdnjs.cloudflare.com',
            'data:',
          ],
          imgSrc: [
            `'self'`,
            'data:',
            'cdn.jsdelivr.net',
            '*.cloudinary.com',
            'flagcdn.com',
            '*.freepik.com',
            'blob:',
          ],
          frameSrc: ['*.magic.link'],
          scriptSrc: [
            `'self'`,
            `https: 'unsafe-inline'`,
            `cdn.jsdelivr.net`,
            `'unsafe-eval'`,
          ],
          connectSrc: [
            `'self'`,
            '*.meappbounty.com',
            '*.usemeprotocol.com',
            '*.alchemy.com',
            '*.magic.link',
            'ipapi.co',
            '*.gelato.digital',
            '*.intercom.io',
            'http://localhost:5173/',
          ],
        },
      },
    }),
  );

  await app.listen(APP_SERVER_LISTEN_PORT, APP_SERVER_LISTEN_IP, () => {
    logger.log(`Server listening on ${APP_SERVER_LISTEN_PORT}`);
    console.log(`Server listening on ${APP_SERVER_LISTEN_PORT}`);
  });

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
