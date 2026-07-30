import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthorizationException } from '../filters';
import { SECURITY_METADATA_KEYS } from './security-metadata.constants';
import type { PolicyRequirement } from './security.types';

/** Policy guard boundary for policy-based authorization. */
@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /** Allows routes with no policy requirements and rejects protected routes. */
  canActivate(context: ExecutionContext): boolean {
    const requiredPolicies = this.reflector.getAllAndOverride<
      PolicyRequirement[]
    >(SECURITY_METADATA_KEYS.policies, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPolicies?.length) {
      return true;
    }

    throw new AuthorizationException(
      'Policy evaluation requires an authenticated user context.',
      { requiredPolicies },
    );
  }
}
