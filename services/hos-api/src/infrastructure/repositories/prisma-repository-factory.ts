import { Injectable } from '@nestjs/common';

import type { EntityId } from '../../database/contracts';
import { InfrastructureException } from '../../filters/exceptions';
import type { Repository } from '../../shared/domain';
import { PrismaRepositoryBase } from './prisma-repository.base';
import type { PrismaRepositoryDelegate } from './prisma-repository.types';

class RuntimePrismaRepository<
  TEntity extends { readonly id: TIdentifier },
  TIdentifier = EntityId,
> extends PrismaRepositoryBase<TEntity, TIdentifier> {
  constructor(delegate: PrismaRepositoryDelegate<TEntity, TIdentifier>) {
    super(delegate);
  }
}

/** Resolves and creates infrastructure repositories for future bounded contexts. */
@Injectable()
export class PrismaRepositoryFactory {
  private readonly repositories = new Map<
    string,
    Repository<unknown, unknown>
  >();

  /** Registers a concrete repository by stable repository name. */
  registerRepository<TEntity, TIdentifier>(
    name: string,
    repository: Repository<TEntity, TIdentifier>,
  ): void {
    this.repositories.set(name, repository);
  }

  /** Resolves a registered repository by stable repository name. */
  getRepository<TEntity, TIdentifier = EntityId>(
    name: string,
  ): Repository<TEntity, TIdentifier> {
    const repository = this.repositories.get(name);

    if (!repository) {
      throw new InfrastructureException(
        `Repository is not registered: ${name}`,
      );
    }

    return repository as Repository<TEntity, TIdentifier>;
  }

  /** Creates a generic Prisma repository from a model delegate. */
  createRepository<TEntity extends { readonly id: TIdentifier }, TIdentifier>(
    delegate: PrismaRepositoryDelegate<TEntity, TIdentifier>,
  ): Repository<TEntity, TIdentifier> {
    return new RuntimePrismaRepository(delegate);
  }
}
