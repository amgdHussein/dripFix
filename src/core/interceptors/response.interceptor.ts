import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response {
  result: unknown;
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const response = next.handle().pipe<Response>(
      map((output): Response => {
        return {
          result: output,
          isArray: Array.isArray(output),
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
        };
      }),
    );

    return response;
  }
}
