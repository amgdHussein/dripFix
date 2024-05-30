/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArgumentsHost, Catch, HttpException, HttpStatus, Injectable, ExceptionFilter as NestExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Injectable()
@Catch(HttpException)
export class ExceptionFilter implements NestExceptionFilter<HttpException> {
  /**
   * Handles the caught exception and sends an appropriate JSON response.
   * @param {HttpException} exception - the caught exception
   * @param {ArgumentsHost} host - the arguments host
   * @return {void}
   */
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const request: Request = context.getRequest<Request>();
    const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get the cause of the error (custom exception or validation pipe exception)
    const cause: string | string[] = (exception as any)?.response?.message || exception?.cause;
    const message: string = (exception.message || exception) as string;

    response.status(status).json({
      statusCode: status,
      message: message,
      cause: cause,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
