import {
  AlwaysSatisfiedSpecification,
  CompositeSpecification,
} from '../../shared/domain/specifications';
import { PrismaRepositoryFactory } from './prisma-repository-factory';
import type { PrismaRepositoryDelegate } from './prisma-repository.types';

interface TestEntity {
  readonly id: string;
  readonly label: string;
}

class LabelSpecification extends CompositeSpecification<TestEntity> {
  constructor(private readonly label: string) {
    super();
  }

  isSatisfiedBy(candidate: TestEntity): boolean {
    return candidate.label === this.label;
  }
}

class InMemoryPrismaDelegate implements PrismaRepositoryDelegate<
  TestEntity,
  string
> {
  private readonly entities = new Map<string, TestEntity>();

  constructor(seed: readonly TestEntity[]) {
    seed.forEach((entity) => this.entities.set(entity.id, entity));
  }

  findUnique(args: {
    readonly where: { readonly id: string };
  }): Promise<TestEntity | null> {
    return Promise.resolve(this.entities.get(args.where.id) ?? null);
  }

  findMany(): Promise<readonly TestEntity[]> {
    return Promise.resolve([...this.entities.values()]);
  }

  upsert(args: {
    readonly where: { readonly id: string };
    readonly create: TestEntity;
    readonly update: Partial<TestEntity>;
  }): Promise<TestEntity> {
    const nextEntity = this.entities.has(args.where.id)
      ? {
          ...this.entities.get(args.where.id),
          ...args.update,
          id: args.where.id,
        }
      : args.create;

    this.entities.set(args.where.id, nextEntity);
    return Promise.resolve(nextEntity);
  }

  delete(args: {
    readonly where: { readonly id: string };
  }): Promise<TestEntity> {
    const entity = this.entities.get(args.where.id);
    this.entities.delete(args.where.id);
    return Promise.resolve(entity ?? { id: args.where.id, label: 'deleted' });
  }
}

describe('Prisma repository adapters', () => {
  it('creates a generic repository over a Prisma-compatible delegate', async () => {
    const factory = new PrismaRepositoryFactory();
    const repository = factory.createRepository(
      new InMemoryPrismaDelegate([
        { id: 'one', label: 'alpha' },
        { id: 'two', label: 'beta' },
      ]),
    );

    await expect(repository.findById('one')).resolves.toEqual({
      id: 'one',
      label: 'alpha',
    });
    await expect(
      repository.findMany(new LabelSpecification('beta')),
    ).resolves.toEqual([{ id: 'two', label: 'beta' }]);
  });

  it('saves, deletes, and paginates through the generic repository', async () => {
    const factory = new PrismaRepositoryFactory();
    const repository = factory.createRepository(
      new InMemoryPrismaDelegate([{ id: 'one', label: 'alpha' }]),
    );

    await expect(
      repository.save({ id: 'two', label: 'beta' }),
    ).resolves.toEqual({ id: 'two', label: 'beta' });
    await repository.delete('one');

    await expect(
      repository.paginate(new AlwaysSatisfiedSpecification<TestEntity>(), {
        page: 1,
        pageSize: 10,
      }),
    ).resolves.toMatchObject({
      items: [{ id: 'two', label: 'beta' }],
      total: 1,
    });
  });

  it('registers and resolves named repositories', () => {
    const factory = new PrismaRepositoryFactory();
    const repository = factory.createRepository(new InMemoryPrismaDelegate([]));

    factory.registerRepository('test', repository);

    expect(factory.getRepository<TestEntity>('test')).toBe(repository);
  });
});
