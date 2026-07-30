import { SetMetadata } from '@nestjs/common';

import { AuditAction } from './audit-action.enum';

/** Metadata key used to describe auditable route handlers. */
export const AUDIT_METADATA_KEY = 'juth:audit';

/** Metadata describing an auditable operation. */
export interface AuditMetadata {
  action: AuditAction;
  resource: string;
}

/** Attaches audit metadata to a route handler or controller. */
export const Auditable = (metadata: AuditMetadata) =>
  SetMetadata(AUDIT_METADATA_KEY, metadata);
