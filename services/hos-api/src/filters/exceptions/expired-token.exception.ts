import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when a token has expired. */
export class ExpiredTokenException extends BaseException {
  constructor(message = 'Token has expired.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.ExpiredToken,
      HttpStatus.UNAUTHORIZED,
      details,
    );
  }
}
