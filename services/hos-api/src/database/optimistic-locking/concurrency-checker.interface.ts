import type { VersionedEntity } from '../contracts';

/** Contract for optimistic lock conflict checks. */
export interface ConcurrencyChecker<TEntity extends VersionedEntity> {
  assertVersion(current: TEntity, expectedVersion: number): void;
}
