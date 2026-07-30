import type { EntityId } from '../contracts';

/** Write repository contract for entity persistence. */
export interface WriteRepository<TEntity> {
  save(entity: TEntity): Promise<TEntity>;
  delete(id: EntityId): Promise<void>;
}
