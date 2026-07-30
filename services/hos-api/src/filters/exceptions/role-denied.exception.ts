import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when role authorization fails. */
export class RoleDeniedException extends BaseException {
  constructor(message = 'Role denied.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.RoleDenied,
      HttpStatus.FORBIDDEN,
      details,
    );
  }
}
