import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { APPLICATION_CONSTANTS } from '../constants/application.constants';
import { RequestContextService } from '../core';
import type { ApiError } from '../interfaces/api-error.interface';
import { EnterpriseLoggerService } from '../logging';
import { DateUtils } from '../utils/date.utils';
import { RequestUtils } from '../utils/request.utils';
import { BaseException, EnterpriseErrorCode } from './exceptions';

interface HttpExceptionBody {
  message?: string | string[];
  error?: string;
  errorCode?: string;
  statusCode?: number;
}

function isHttpExceptionBody(value: unknown): value is HttpExceptionBody {
  return typeof value === 'object' && value !== null;
}

/** Converts all thrown errors into the enterprise API error contract. */
@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: EnterpriseLoggerService,
    private readonly contextService?: RequestContextService,
  ) {}

  /** Handles HTTP and unexpected errors with consistent logging and payloads. */
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : undefined;
    const details = isHttpExceptionBody(exceptionResponse)
      ? exceptionResponse
      : undefined;
    const message = this.resolveMessage(exception, details);
    const requestId =
      this.contextService?.getRequestId() ??
      RequestUtils.resolveRequestId(request);
    const payload: ApiError = {
      success: false,
      timestamp: DateUtils.nowIso(),
      requestId,
      statusCode,
      errorCode: this.resolveCode(exception, statusCode, details),
      message,
      details: this.resolveDetails(exception, details),
      path: request.originalUrl,
      method: request.method,
      version: APPLICATION_CONSTANTS.apiVersion,
    };

    this.logException(exception, request, requestId, statusCode);
    response.status(statusCode).json(payload);
  }

  private resolveCode(
    exception: unknown,
    statusCode: number,
    details: HttpExceptionBody | undefined,
  ): string {
    if (exception instanceof BaseException) {
      return exception.errorCode;
    }

    if (typeof details?.errorCode === 'string') {
      return details.errorCode;
    }

    if (statusCode === Number(HttpStatus.BAD_REQUEST)) {
      return EnterpriseErrorCode.Validation;
    }

    if (
      statusCode === Number(HttpStatus.FORBIDDEN) ||
      statusCode === Number(HttpStatus.UNAUTHORIZED)
    ) {
      return EnterpriseErrorCode.Authorization;
    }

    return details?.error ?? EnterpriseErrorCode.Unexpected;
  }

  private resolveMessage(
    exception: unknown,
    details: HttpExceptionBody | undefined,
  ): string {
    if (Array.isArray(details?.message)) {
      return details.message.join('; ');
    }

    if (typeof details?.message === 'string') {
      return details.message;
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'An unexpected error occurred.';
  }

  private logException(
    exception: unknown,
    request: Request,
    requestId: string,
    statusCode: number,
  ): void {
    const message = `${request.method} ${request.originalUrl} failed with ${statusCode} [${requestId}]`;
    if (exception instanceof Error) {
      this.logger.error(message, exception.stack, 'ExceptionFilter');
      return;
    }

    this.logger.error(message, undefined, 'ExceptionFilter');
  }

  private resolveDetails(
    exception: unknown,
    details: HttpExceptionBody | undefined,
  ): unknown {
    if (exception instanceof BaseException) {
      return exception.details;
    }

    return details;
  }
}
