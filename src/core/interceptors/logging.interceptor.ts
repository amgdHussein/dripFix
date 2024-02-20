/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger, Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logger Interceptor.
 * Creates informative logs for all requests, showing the path,
 * the method name, user id, called handler, and time taken to execute the request.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<void> | Promise<Observable<void>> {
    // Before the route handler
    const now = Date.now();
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request = httpContext.getRequest();
    const userAgent: Request = request.get('user-agent') || 'none';
    const { ip, method, path } = request;

    Logger.log(
      `method=${method} userAgent=${userAgent} ip=${ip}: handler=${context.getClass().name}.${context.getHandler().name}`,
      `Incoming Request on ${path}`,
    );

    // After the route handler
    return next.handle().pipe<void>(
      tap(
        (): void => {
          return Logger.log(
            `method=${method} statusCode=${httpContext.getResponse().statusCode} duration +${Date.now() - now}ms`,
            `End Request for ${path}`,
          );
        },
        exception => {
          // Get the cause of the error (custom exception or validation pipe exception)
          const exceptionResponse = exception.getResponse();
          const cause: string | string[] = (exception.cause as Error)?.message || (exceptionResponse as any)?.message || exceptionResponse;
          const message: string = (exceptionResponse as any)?.error || exception.message || exceptionResponse;

          return Logger.error(
            `statusCode=${exception.status} error="${message}" cause="${[cause].flat().join(', ')}"`,
            `Error Stack: ${exception.stack || ''}`,
            `End Request for ${path}`,
          );
        },
      ),
    );
  }
}
