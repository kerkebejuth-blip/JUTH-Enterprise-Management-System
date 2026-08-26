import { InfrastructureException } from '../../filters/exceptions';
import type { PrismaRepositoryDelegate } from './prisma-repository.types';

/** Persists an entity through a Prisma-compatible delegate. */
export async function saveWithDelegate<
  TEntity extends { readonly id: TIdentifier },
  TIdentifier,
>(
  delegate: PrismaRepositoryDelegate<TEntity, TIdentifier>,
  entity: TEntity,
): Promise<TEntity> {
  if (delegate.upsert) {
    return delegate.upsert({
      where: { id: entity.id },
      create: entity,
      update: entity,
    });
  }

  if (delegate.update) {
    return delegate.update({
      where: { id: entity.id },
      data: entity,
    });
  }

  if (delegate.create) {
    return delegate.create({ data: entity });
  }

  throw new InfrastructureException(
    'Prisma repository delegate does not support write operations.',
  );
}

/** Deletes an entity through a Prisma-compatible delegate. */
export async function deleteWithDelegate<TEntity, TIdentifier>(
  delegate: PrismaRepositoryDelegate<TEntity, TIdentifier>,
  id: TIdentifier,
): Promise<void> {
  if (!delegate.delete) {
    throw new InfrastructureException(
      'Prisma repository delegate does not support delete operations.',
    );
  }

  await delegate.delete({ where: { id } });
}
