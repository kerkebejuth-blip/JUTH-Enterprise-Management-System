import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when authentication is missing or invalid. */
export class AuthenticationException extends BaseException {
  constructor(message = 'Authentication failed.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.Authentication,
      HttpStatus.UNAUTHORIZED,
      details,
    );
  }
}
