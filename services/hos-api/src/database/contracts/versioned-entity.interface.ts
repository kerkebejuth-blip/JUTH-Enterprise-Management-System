/** Entity contract for optimistic locking and concurrency checks. */
export interface VersionedEntity {
  version: number;
}
