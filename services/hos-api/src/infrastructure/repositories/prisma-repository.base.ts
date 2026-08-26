import type { EntityId } from '../../database/contracts';
import type { Repository } from '../../shared/domain';
import { PrismaReadRepositoryBase } from './prisma-read-repository.base';
import type { PrismaRepositoryDelegate } from './prisma-repository.types';
import {
  deleteWithDelegate,
  saveWithDelegate,
} from './prisma-write-operations';

/** Generic Prisma repository base combining read and write capabilities. */
export abstract class PrismaRepositoryBase<
  TEntity extends { readonly id: TIdentifier },
  TIdentifier = EntityId,
>
  extends PrismaReadRepositoryBase<TEntity, TIdentifier>
  implements Repository<TEntity, TIdentifier>
{
  protected constructor(
    protected override readonly delegate: PrismaRepositoryDelegate<
      TEntity,
      TIdentifier
    >,
  ) {
    super(delegate);
  }

  /** Persists an entity using the richest delegate capability available. */
  save(entity: TEntity): Promise<TEntity> {
    return saveWithDelegate(this.delegate, entity);
  }

  /** Deletes an entity by identifier. */
  delete(id: TIdentifier): Promise<void> {
    return deleteWithDelegate(this.delegate, id);
  }
}
