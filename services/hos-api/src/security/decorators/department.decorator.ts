import { SetMetadata } from '@nestjs/common';

import { SECURITY_METADATA_KEYS } from '../security-metadata.constants';

/** Attaches required department scope metadata to a route handler or controller. */
export const Department = (...departments: string[]) =>
  SetMetadata(SECURITY_METADATA_KEYS.departments, departments);
