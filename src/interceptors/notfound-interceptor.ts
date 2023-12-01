import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const publicFile = join(__dirname, '../../client/index.html');
    const stream = readFileSync(publicFile);

    response.status(200).send(stream);
  }
}
