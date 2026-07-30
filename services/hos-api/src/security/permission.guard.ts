import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionDeniedException } from '../filters';
import { SECURITY_METADATA_KEYS } from './security-metadata.constants';

/** Permission guard boundary for permission-based access control. */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /** Allows routes with no permission requirements and rejects protected routes. */
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      SECURITY_METADATA_KEYS.permissions,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions?.length) {
      return true;
    }

    throw new PermissionDeniedException(
      'Permission evaluation requires an authenticated user context.',
      { requiredPermissions },
    );
  }
}
