import type { RepositoryFactory } from '../repositories';
import type { TransactionScope } from './transaction-scope.interface';

/** Unit of Work contract coordinating repositories and transaction scopes. */
export interface IUnitOfWork {
  readonly repositories: RepositoryFactory;
  transaction: TransactionScope;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
