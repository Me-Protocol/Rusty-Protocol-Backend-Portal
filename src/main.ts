import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { jwtConfigurations } from './config/jwt.config';
import * as session from 'express-session';
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
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { SentryFilter } from './filters/sentry.filter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary_1 = require('cloudinary');

// const {
//   CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET,
//   APP_SERVER_LISTEN_PORT,
//   APP_SERVER_LISTEN_IP,
// } = process.env;

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
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Use Sentry middleware here

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  // // The error handler must be registered before any other error middleware and after all controllers
  // app.use(Sentry.Handlers.errorHandler());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  app.enableCors();
  app.use(
    session({
      secret: jwtConfigurations.secret,
      saveUninitialized: true,
      resave: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  // const httpServer = app.getHttpServer();
  // createWebSocketServer(httpServer);

  // const config = new DocumentBuilder()
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //       name: 'JWT',
  //       description: 'Enter Bearer token',
  //       in: 'header',
  //     },
  //     'JWT-auth',
  //   )
  //   .setTitle(process.env.APP_NAME)
  //   .setDescription(process.env.APP_DESCRIPTION)
  //   .setVersion(process.env.API_VERSION)
  //   .build();

  // const document = SwaggerModule.createDocument(app, config, {
  //   ignoreGlobalPrefix: false,
  // });
  // try {
  //   SwaggerModule.setup('doc', app, document); // the swagger URL is thus /api
  // } catch (error) {
  //   logger.error(error);
  // }

  await app.listen(APP_SERVER_LISTEN_PORT, APP_SERVER_LISTEN_IP);

  cloudinary_1.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });

  // logger.warn(`Application is now running on: ${await app.getUrl()}`);
  logger.verbose(`Application is now running on: ${await app.getUrl()}`);
}
bootstrap();
