import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import { HEADER_NAMES } from '../../constants/application.constants';
import type { UserContext } from '../../modules/identity/domain';

/** Extracts the current user context placeholder from request metadata. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserContext => {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      userId: request.header(HEADER_NAMES.userId),
      sessionId: request.header(HEADER_NAMES.sessionId),
      departmentId: request.header(HEADER_NAMES.department),
      tenantId: request.header(HEADER_NAMES.tenant),
      roles: [],
      permissions: [],
      claims: [],
    };
  },
);
