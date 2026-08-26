import type { EntityId } from '../../../database/contracts';
import type { PageRequest, PageResult } from '../../../database/pagination';
import type { Specification } from '../specifications';

/** Read-only repository contract for aggregate and entity retrieval. */
export interface ReadRepository<TEntity, TIdentifier = EntityId> {
  findById(id: TIdentifier): Promise<TEntity | null>;
  findOne(specification: Specification<TEntity>): Promise<TEntity | null>;
  findMany(specification: Specification<TEntity>): Promise<readonly TEntity[]>;
  paginate(
    specification: Specification<TEntity>,
    pageRequest: PageRequest,
  ): Promise<PageResult<TEntity>>;
}

/** Write repository contract for aggregate and entity persistence. */
export interface WriteRepository<TEntity, TIdentifier = EntityId> {
  save(entity: TEntity): Promise<TEntity>;
  delete(id: TIdentifier): Promise<void>;
}

/** Full repository contract combining read and write operations. */
export interface Repository<TEntity, TIdentifier = EntityId>
  extends
    ReadRepository<TEntity, TIdentifier>,
    WriteRepository<TEntity, TIdentifier> {}
