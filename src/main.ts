import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
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
//import * as Sentry from '@sentry/node';
//import { ProfilingIntegration } from '@sentry/profiling-node';
//import { SentryFilter } from './filters/sentry.filter';
import { TracingInterceptor } from './interceptors/tracing.interceptor';
import { join } from 'path';
import { NotFoundExceptionFilter } from './interceptors/notfound-interceptor';
import helmet from '@fastify/helmet';

const cloudinary = require('cloudinary');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
    {
      bufferLogs: true,
    },
  );

  cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  // app.use(
  //   session({
  //     secret: JWT_SECRETS,
  //     saveUninitialized: true,
  //     resave: true,
  //   }),
  // );

  /**
   * Interceptors
   */
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TracingInterceptor());
  // app.setGlobalPrefix('app');

  // Use Sentry middleware here

  // The request handler must be the first middleware on the app
  /**
   * Create views folder and set view engine. Nunjucks should already be installed.
   * npm install @fastify/view point-of-view nunjucks
   * npm install -D @types/nunjucks
   */
  app.setViewEngine({
    engine: {
      nunjucks: require('nunjucks'),
    },
    templates: join(__dirname, '..', 'client'),
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'client'),
    prefix: '/client/',
    decorateReply: false,
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'client/assets'),
    prefix: '/assets/',
    decorateReply: false,
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'client/static'),
    prefix: '/static/',
    decorateReply: false,
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'client/fonts'),
    prefix: '/fonts/',
    decorateReply: false,
  });

  app.useStaticAssets({
    root: join(__dirname, '..', 'client/images'),
    prefix: '/images/',
    decorateReply: false,
  });

  // Conditionally setup swagger
  if (process.env.NODE_ENV === 'development') {
    setupSwagger(app);
  }

  app.enableCors();

  const fastifyInstance = app.getHttpAdapter().getInstance();

  await fastifyInstance.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`, 'unpkg.com', '*.cloudinary.com'],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
          '*.cloudinary.com',
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
          '*.cloudinary.com',
          'ipapi.co',
          '*.gelato.digital',
          '*.intercom.io',
          'https://*.cloudinary.com ',
        ],
      },
    },
  });

  // await fastifyInstance.register(helmet, {
  //   contentSecurityPolicy: {
  //     directives: {
  //       defaultSrc: ['*'],
  //       styleSrc: ['*'],
  //       fontSrc: ['*'],
  //       imgSrc: ['*'],
  //       frameSrc: ['*'],
  //       scriptSrc: ['*'],
  //       connectSrc: ['*'],
  //     },
  //   },
  // });

  fastifyInstance.addHook('onRequest', (request, reply, done) => {
    reply.setHeader = function (key: any, value: any) {
      return this.raw.setHeader(key, value);
    };
    reply.end = function () {
      this.raw.end();
    };
    request.res = reply;
    done();
  });

  await app.listen(
    APP_SERVER_LISTEN_PORT,
    APP_SERVER_LISTEN_IP,
    (err: any, address: any) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      logger.log(`Server listening on ${address}`);
      console.log(`Server listening on ${address}`);
    },
  );
}
bootstrap();
