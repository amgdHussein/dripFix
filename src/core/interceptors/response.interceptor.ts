import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, map } from 'rxjs';

export interface Response {
  result: unknown;
  path: string;
  duration: string;
  method: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext | GqlExecutionContext, next: CallHandler): Observable<Response> {
    const now = Date.now();
    const contextType = context.getType() as string;

    switch (contextType) {
      case 'http': {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();

        return next.handle().pipe<Response>(
          map(data => {
            return {
              result: data,
              path: request.path,
              duration: `${Date.now() - now}ms`,
              method: request.method,
            };
          }),
        );
      }

      case 'graphql': {
        return next.handle();
      }
    }
  }
}
