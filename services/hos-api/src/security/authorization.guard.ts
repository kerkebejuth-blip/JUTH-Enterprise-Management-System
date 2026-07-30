import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthorizationException } from '../filters';
import { SECURITY_METADATA_KEYS } from './security-metadata.constants';
import type { Claim, PolicyRequirement } from './security.types';

/** Evaluates authorization metadata without implementing authentication. */
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /** Allows routes with no requirements and rejects protected routes until auth exists. */
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      SECURITY_METADATA_KEYS.public,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const handler = context.getHandler();
    const targetClass = context.getClass();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      SECURITY_METADATA_KEYS.roles,
      [handler, targetClass],
    );
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      SECURITY_METADATA_KEYS.permissions,
      [handler, targetClass],
    );
    const requiredClaims = this.reflector.getAllAndOverride<Claim[]>(
      SECURITY_METADATA_KEYS.claims,
      [handler, targetClass],
    );
    const requiredPolicies = this.reflector.getAllAndOverride<
      PolicyRequirement[]
    >(SECURITY_METADATA_KEYS.policies, [handler, targetClass]);

    if (
      !requiredRoles?.length &&
      !requiredPermissions?.length &&
      !requiredClaims?.length &&
      !requiredPolicies?.length
    ) {
      return true;
    }

    throw new AuthorizationException(
      'Authentication is required before authorization policies can be evaluated.',
    );
  }
}
