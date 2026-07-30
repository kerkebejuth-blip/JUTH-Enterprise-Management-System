import type { ReadRepository } from './read-repository.interface';
import type { WriteRepository } from './write-repository.interface';

/** Full repository contract combining read and write capabilities. */
export interface Repository<TEntity>
  extends ReadRepository<TEntity>, WriteRepository<TEntity> {}
