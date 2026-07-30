import { SetMetadata } from '@nestjs/common';

import { SECURITY_METADATA_KEYS } from '../security-metadata.constants';
import type { PolicyRequirement } from '../security.types';

/** Attaches required policy metadata to a route handler or controller. */
export const Policies = (...policies: PolicyRequirement[]) =>
  SetMetadata(SECURITY_METADATA_KEYS.policies, policies);
