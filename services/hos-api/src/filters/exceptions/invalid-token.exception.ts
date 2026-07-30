import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when a token cannot be validated. */
export class InvalidTokenException extends BaseException {
  constructor(message = 'Token is invalid.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.InvalidToken,
      HttpStatus.UNAUTHORIZED,
      details,
    );
  }
}
