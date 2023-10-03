import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
const path = require('path');
const fs = require('fs');

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const publicFile = path.resolve(
      __dirname + '../../../../public/index.html',
    );

    const stream = fs.readFileSync(publicFile);
    response.type('text/html').send(stream);
  }
}
