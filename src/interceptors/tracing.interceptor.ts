import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { initTracer } from 'jaeger-client';
import { FORMAT_HTTP_HEADERS, Tags, Span } from 'opentracing';

@Injectable()
export class TracingInterceptor implements NestInterceptor {
  private tracer;

  constructor() {
    const config = {
      serviceName: 'nestjs-jaeger',
      reporter: {
        // The default agent host and port. Adjust if needed.
        agentHost: 'localhost',
        agentPort: 1450,
      },
    };
    const options = {
      logger: {
        info(msg) {
          console.log('INFO', msg);
        },
        error(msg) {
          console.log('ERROR', msg);
        },
      },
    };
    this.tracer = initTracer(config, options);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const parentSpanContext = this.tracer.extract(
      FORMAT_HTTP_HEADERS,
      req.headers,
    );
    const span: Span = this.tracer.startSpan(
      'HTTP ' + req.method + ' ' + req.url,
      {
        childOf: parentSpanContext,
      },
    );

    // Log any useful request data
    span.log({ event: 'request_start', url: req.url, headers: req.headers });

    return next.handle().pipe(
      tap(
        () => {
          // On successful response
          span.log({ event: 'request_end' });
          span.finish();
        },
        (err) => {
          // On error
          span.setTag(Tags.ERROR, true);
          span.log({ event: 'request_error', error: err });
          span.finish();
        },
      ),
    );
  }
}
