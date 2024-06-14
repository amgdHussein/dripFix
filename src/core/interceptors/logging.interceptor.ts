import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  public intercept(context: ExecutionContext | GqlExecutionContext, next: CallHandler): Observable<void> {
    const now = Date.now();
    const contextType = context.getType() as string;

    switch (contextType) {
      case 'http': {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const userAgent = request.get('user-agent') || 'none';
        const { ip, method, path } = request;

        // To view incoming request
        this.logger.log(`Incoming HTTP Request on ${path}`);

        // To view request data as method, agent, ip, and handler
        this.logger.debug(`method=${method} userAgent=${userAgent} ip=${ip}: handler=${context.getClass().name}.${context.getHandler().name}`);

        return next.handle().pipe<void>(
          tap({
            next: (): void => {
              // To log the result of the request
              this.logger.debug(`statusCode=${httpContext.getResponse().statusCode} duration +${Date.now() - now}ms`);
            },
            error: (exception): void => {
              // TODO: USE HttpException FOR ERROR HANDLING
              const cause = exception.response?.message || exception?.cause;
              const message = exception.message || exception;

              // To log the error of the request
              this.logger.error(
                `statusCode=${exception.status} error="${message}" cause="${[cause].flat().join(', ')}"`,
                `Error Stack: ${exception.stack || ''}`,
              );
            },
            complete: (): void => {
              // Log the end of the request
              this.logger.log(`End HTTP Request for ${path}`);
            },
          }),
        );
      }

      case 'graphql': {
        const gqlContext = GqlExecutionContext.create(context);
        const info = gqlContext.getInfo();
        const { fieldName, parentType, path } = info;
        const request = gqlContext.getContext().req;
        const userAgent = request.get('user-agent') || 'none';
        const { ip, method } = request;

        // To view incoming request
        this.logger.log(`Incoming GraphQL Request on ${path.key}`);

        // To view request data as method, agent, ip, and handler
        this.logger.debug(`method=${method} userAgent=${userAgent} ip=${ip}: handler=${context.getClass().name}.${context.getHandler().name}`);

        return next.handle().pipe<void>(
          tap({
            next: (): void => {
              // To log the result of the request
              this.logger.debug(`fieldName=${fieldName} parentType=${parentType} duration +${Date.now() - now}ms`);
            },
            error: exception => {
              const cause = exception?.response?.message || exception?.cause;
              const message = exception.message || exception;

              // To log the error of the request
              this.logger.error(`error="${message}" cause="${[cause].flat().join(', ')}"`, `Error Stack: ${exception.stack || ''}`);
            },
            complete: (): void => {
              // Log the end of the request
              this.logger.log(`End GraphQL Request for ${path.key}`);
            },
          }),
        );
      }
    }
  }
}
