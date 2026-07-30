import { SetMetadata } from '@nestjs/common';

import { SECURITY_METADATA_KEYS } from '../security-metadata.constants';

/** Marks a route handler or controller as publicly accessible. */
export const Public = () => SetMetadata(SECURITY_METADATA_KEYS.public, true);
