import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthenticationException } from '../filters';
import { SECURITY_METADATA_KEYS } from './security-metadata.constants';

/** Authentication guard boundary for future provider-backed authentication. */
@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /** Allows public routes and rejects protected routes until auth providers exist. */
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      SECURITY_METADATA_KEYS.public,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    throw new AuthenticationException(
      'Authentication provider implementation is not configured.',
    );
  }
}
