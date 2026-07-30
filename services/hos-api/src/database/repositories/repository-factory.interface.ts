import type { Repository } from './repository.interface';

/** Factory contract for resolving repositories inside transaction scopes. */
export interface RepositoryFactory {
  getRepository<TEntity>(entityName: string): Repository<TEntity>;
}
