import { randomUUID } from 'crypto';

import type { EntityId } from '../../../database/contracts';

/** Identifier provider abstraction for future domain entities. */
export interface IdentifierGenerator<TIdentifier = EntityId> {
  generate(): TIdentifier;
}

/** UUID identifier generator using Node crypto infrastructure. */
export class UuidGenerator implements IdentifierGenerator<EntityId> {
  /** Generates a RFC 4122 UUID value. */
  generate(): EntityId {
    return randomUUID();
  }
}
