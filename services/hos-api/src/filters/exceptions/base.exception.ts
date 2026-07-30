import { HttpException, HttpStatus } from '@nestjs/common';

import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Base class for enterprise exceptions with stable error codes and details. */
export class BaseException extends HttpException {
  constructor(
    message: string,
    public readonly errorCode: EnterpriseErrorCode,
    statusCode: HttpStatus,
    public readonly details?: unknown,
  ) {
    super({ message, errorCode, details }, statusCode);
  }
}
