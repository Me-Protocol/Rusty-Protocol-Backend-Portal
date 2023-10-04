import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { jwtConfigurations } from './config/jwt.config';
import * as session from 'express-session';
import { logger } from './globalServices/logger/logger.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { setupSwagger } from './config/swagger/swagger.config';
// import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  APP_SERVER_LISTEN_PORT,
  APP_SERVER_LISTEN_IP,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from './config/env.config';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { SentryFilter } from './filters/sentry.filter';
import { TracingInterceptor } from './interceptors/tracing.interceptor';
import { join } from 'path';
import { NotFoundExceptionFilter } from './interceptors/notfound-interceptor';

const cloudinary = require('cloudinary');

//To Initialize sentry
Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    new ProfilingIntegration(), //This captures the profiling information. That is, it enables automatic profiling of the transactions
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
});

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

  /**
   * Interceptors
   */
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new TracingInterceptor());
  // app.setGlobalPrefix('app');

  // Use Sentry middleware here

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  // // The error handler must be registered before any other error middleware and after all controllers
  // app.use(Sentry.Handlers.errorHandler());

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

  setupSwagger(app);

  app.enableCors();
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //For fastify, include 0.0.0.0 to listen on all IPs on the system. Otherwise, fastify will only listen on localhost.

  // add helper for passportjs

  // await app.register(secureSession, {
  //   secret: process.env.JWT_SECRETS,
  //   salt: process.env.JWT_SALT,
  //   cookie: {
  //     secure: false,
  //     sameSite: false,
  //   },
  // });

  const fastifyInstance = app.getHttpAdapter().getInstance();

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

  app.use(
    session({
      secret: jwtConfigurations.secret,
      saveUninitialized: true,
      resave: true,
    }),
  );

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

  //More NOTES about fastify use: See https://docs.nestjs.com/techniques/performance for redirect and options
}
bootstrap();
