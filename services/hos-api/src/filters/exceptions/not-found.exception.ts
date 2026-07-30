import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when a requested resource cannot be found. */
export class NotFoundException extends BaseException {
  constructor(message = 'Resource not found.', details?: unknown) {
    super(message, EnterpriseErrorCode.NotFound, HttpStatus.NOT_FOUND, details);
  }
}
