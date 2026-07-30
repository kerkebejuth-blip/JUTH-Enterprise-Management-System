import type { EntityId } from '../contracts';
import type { PageRequest, PageResult } from '../pagination';
import type { Specification } from './specification.interface';

/** Read-only repository contract for entity retrieval. */
export interface ReadRepository<TEntity> {
  findById(id: EntityId): Promise<TEntity | null>;
  findOne(specification: Specification<TEntity>): Promise<TEntity | null>;
  findMany(specification: Specification<TEntity>): Promise<TEntity[]>;
  paginate(
    specification: Specification<TEntity>,
    pageRequest: PageRequest,
  ): Promise<PageResult<TEntity>>;
}
