import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised when permission authorization fails. */
export class PermissionDeniedException extends BaseException {
  constructor(message = 'Permission denied.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.PermissionDenied,
      HttpStatus.FORBIDDEN,
      details,
    );
  }
}
