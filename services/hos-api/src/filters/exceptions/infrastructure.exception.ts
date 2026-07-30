import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { EnterpriseErrorCode } from './enterprise-error-code.enum';

/** Exception raised for infrastructure dependency failures. */
export class InfrastructureException extends BaseException {
  constructor(message = 'Infrastructure failure.', details?: unknown) {
    super(
      message,
      EnterpriseErrorCode.Infrastructure,
      HttpStatus.SERVICE_UNAVAILABLE,
      details,
    );
  }
}
