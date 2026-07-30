import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when an operation conflicts with current state. */
export class ConflictException extends BaseException {
  constructor(message = 'Resource conflict.', details?: unknown) {
    super(message, EnterpriseErrorCode.Conflict, HttpStatus.CONFLICT, details);
  }
}
