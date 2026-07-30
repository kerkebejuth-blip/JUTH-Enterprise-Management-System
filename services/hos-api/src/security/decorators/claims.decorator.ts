import { SetMetadata } from '@nestjs/common';

import { SECURITY_METADATA_KEYS } from '../security-metadata.constants';
import type { Claim } from '../security.types';

/** Attaches required claim metadata to a route handler or controller. */
export const Claims = (...claims: Claim[]) =>
  SetMetadata(SECURITY_METADATA_KEYS.claims, claims);
