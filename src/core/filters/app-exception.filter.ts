/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Catch } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '../exceptions';

type AppException = ForbiddenException | NotFoundException | UnauthorizedException | BadRequestException | InternalServerErrorException;

@Injectable()
@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter<AppException> {
  /**
   * Handles the caught exception and sends an appropriate JSON response.
   * @param {AppException} exception - the caught exception
   * @param {ArgumentsHost} host - the arguments host
   * @return {void}
   */
  public catch(exception: AppException, host: ArgumentsHost): void {
    const context: HttpArgumentsHost = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const request: Request = context.getRequest<Request>();
    const status: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get the cause of the error (custom exception or validation pipe exception)
    const exceptionResponse = exception.getResponse();
    const cause: string | string[] = (exception.cause as Error)?.message || (exceptionResponse as any)?.message || exceptionResponse;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      cause: cause,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
