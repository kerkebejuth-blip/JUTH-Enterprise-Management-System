/** Base repository contract for future persistence adapters. */
export interface Repository<TEntity, TIdentifier extends string | number> {
  findById(id: TIdentifier): Promise<TEntity | null>;
  save(entity: TEntity): Promise<TEntity>;
  delete(id: TIdentifier): Promise<void>;
}
