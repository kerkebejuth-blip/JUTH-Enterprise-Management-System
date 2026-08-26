import type { EntityId } from '../../database/contracts';
import type { WriteRepository } from '../../shared/domain';
import type { PrismaRepositoryDelegate } from './prisma-repository.types';
import {
  deleteWithDelegate,
  saveWithDelegate,
} from './prisma-write-operations';

/** Generic Prisma-backed write repository base for future persistence adapters. */
export abstract class PrismaWriteRepositoryBase<
  TEntity extends { readonly id: TIdentifier },
  TIdentifier = EntityId,
> implements WriteRepository<TEntity, TIdentifier> {
  protected constructor(
    protected readonly delegate: PrismaRepositoryDelegate<TEntity, TIdentifier>,
  ) {}

  /** Persists an entity using the richest delegate capability available. */
  save(entity: TEntity): Promise<TEntity> {
    return saveWithDelegate(this.delegate, entity);
  }

  /** Deletes an entity by identifier. */
  delete(id: TIdentifier): Promise<void> {
    return deleteWithDelegate(this.delegate, id);
  }
}
