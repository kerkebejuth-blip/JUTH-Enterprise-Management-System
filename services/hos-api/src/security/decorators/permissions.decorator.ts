import { SetMetadata } from '@nestjs/common';

import { SECURITY_METADATA_KEYS } from '../security-metadata.constants';

/** Attaches required permission metadata to a route handler or controller. */
export const Permissions = (...permissions: string[]) =>
  SetMetadata(SECURITY_METADATA_KEYS.permissions, permissions);
