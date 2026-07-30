import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthorizationException } from '../filters';
import { SECURITY_METADATA_KEYS } from './security-metadata.constants';

/** Department guard boundary for department-scoped authorization. */
@Injectable()
export class DepartmentGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /** Allows routes with no department requirements and rejects protected routes. */
  canActivate(context: ExecutionContext): boolean {
    const requiredDepartments = this.reflector.getAllAndOverride<string[]>(
      SECURITY_METADATA_KEYS.departments,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredDepartments?.length) {
      return true;
    }

    throw new AuthorizationException(
      'Department scope evaluation requires an authenticated user context.',
      { requiredDepartments },
    );
  }
}
