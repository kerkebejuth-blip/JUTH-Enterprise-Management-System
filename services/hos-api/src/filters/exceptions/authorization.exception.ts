import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when authorization policy evaluation fails. */
export class AuthorizationException extends BaseException {
  constructor(message = 'Access denied.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.Authorization,
      HttpStatus.FORBIDDEN,
      details,
    );
  }
}
