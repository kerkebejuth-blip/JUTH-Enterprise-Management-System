import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when a business rule rejects an operation. */
export class BusinessException extends BaseException {
  constructor(message = 'Business rule violation.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.Business,
      HttpStatus.UNPROCESSABLE_ENTITY,
      details,
    );
  }
}
