import { SetMetadata } from '@nestjs/common';

import { SECURITY_METADATA_KEYS } from '../security-metadata.constants';

/** Attaches required role metadata to a route handler or controller. */
export const Roles = (...roles: string[]) =>
  SetMetadata(SECURITY_METADATA_KEYS.roles, roles);
