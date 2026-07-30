import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when request input validation fails. */
export class ValidationException extends BaseException {
  constructor(message = 'Request validation failed.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.Validation,
      HttpStatus.BAD_REQUEST,
      details,
    );
  }
}
