/** Minimal Prisma-compatible identity selector used by generic adapters. */
export interface PrismaWhereUnique<TIdentifier> {
  readonly id: TIdentifier;
}

/** Minimal Prisma-compatible find unique arguments. */
export interface PrismaFindUniqueArgs<TIdentifier> {
  readonly where: PrismaWhereUnique<TIdentifier>;
}

/** Minimal Prisma-compatible query arguments for future concrete repositories. */
export interface PrismaFindManyArgs {
  readonly skip?: number;
  readonly take?: number;
}

/** Minimal Prisma-compatible create arguments. */
export interface PrismaCreateArgs<TEntity> {
  readonly data: TEntity;
}

/** Minimal Prisma-compatible update arguments. */
export interface PrismaUpdateArgs<TEntity, TIdentifier> {
  readonly where: PrismaWhereUnique<TIdentifier>;
  readonly data: Partial<TEntity>;
}

/** Minimal Prisma-compatible upsert arguments. */
export interface PrismaUpsertArgs<TEntity, TIdentifier> {
  readonly where: PrismaWhereUnique<TIdentifier>;
  readonly create: TEntity;
  readonly update: Partial<TEntity>;
}

/** Minimal Prisma-compatible delete arguments. */
export interface PrismaDeleteArgs<TIdentifier> {
  readonly where: PrismaWhereUnique<TIdentifier>;
}

/** Delegate shape consumed by Prisma repository base classes. */
export interface PrismaRepositoryDelegate<TEntity, TIdentifier> {
  findUnique(args: PrismaFindUniqueArgs<TIdentifier>): Promise<TEntity | null>;
  findMany(args?: PrismaFindManyArgs): Promise<readonly TEntity[]>;
  count?(args?: PrismaFindManyArgs): Promise<number>;
  create?(args: PrismaCreateArgs<TEntity>): Promise<TEntity>;
  update?(args: PrismaUpdateArgs<TEntity, TIdentifier>): Promise<TEntity>;
  upsert?(args: PrismaUpsertArgs<TEntity, TIdentifier>): Promise<TEntity>;
  delete?(args: PrismaDeleteArgs<TIdentifier>): Promise<TEntity>;
}
