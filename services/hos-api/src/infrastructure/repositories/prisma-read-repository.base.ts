import type { EntityId } from '../../database/contracts';
import type { PageRequest, PageResult } from '../../database/pagination';
import type { ReadRepository, Specification } from '../../shared/domain';
import type { PrismaRepositoryDelegate } from './prisma-repository.types';

/** Generic Prisma-backed read repository base for future persistence adapters. */
export abstract class PrismaReadRepositoryBase<
  TEntity extends { readonly id: TIdentifier },
  TIdentifier = EntityId,
> implements ReadRepository<TEntity, TIdentifier> {
  protected constructor(
    protected readonly delegate: PrismaRepositoryDelegate<TEntity, TIdentifier>,
  ) {}

  /** Finds an entity by its stable identifier. */
  findById(id: TIdentifier): Promise<TEntity | null> {
    return this.delegate.findUnique({ where: { id } });
  }

  /** Finds the first entity matching a persistence-independent specification. */
  async findOne(
    specification: Specification<TEntity>,
  ): Promise<TEntity | null> {
    const [firstMatch] = await this.findMany(specification);
    return firstMatch ?? null;
  }

  /** Finds entities matching a persistence-independent specification. */
  async findMany(
    specification: Specification<TEntity>,
  ): Promise<readonly TEntity[]> {
    const entities = await this.delegate.findMany();
    return entities.filter((entity) => specification.isSatisfiedBy(entity));
  }

  /** Returns an offset-paginated result for matching entities. */
  async paginate(
    specification: Specification<TEntity>,
    pageRequest: PageRequest,
  ): Promise<PageResult<TEntity>> {
    const entities = [...(await this.findMany(specification))];
    const start = (pageRequest.page - 1) * pageRequest.pageSize;
    const items = entities.slice(start, start + pageRequest.pageSize);

    return {
      items,
      total: entities.length,
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };
  }
}
