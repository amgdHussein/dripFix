/* eslint-disable @typescript-eslint/no-explicit-any */

import { Logger, Inject, Injectable, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Catch } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

import { APP_LOGGER } from '../constants';
import { ForbiddenException, NotFoundException } from '../exceptions';

type AppException = ForbiddenException | NotFoundException;

@Injectable()
@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter<AppException> {
  constructor(
    @Inject(APP_LOGGER)
    private readonly logger: Logger,
  ) {}

  public catch(exception: AppException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const request: Request = context.getRequest<Request>();
    const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.debug(`method=${request.method} status=${status} trace=${exception.stack}`, `End Request for ${request.url}`);

    response.status(status).json({
      statusCode: status,
      message: exception.message.trim(),
      cause: (exception as any).cause.message,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
