import type { TransactionScope } from './transaction-scope.interface';

/** Transaction manager contract for creating transaction scopes. */
export interface TransactionManager {
  begin(parent?: TransactionScope): Promise<TransactionScope>;
}
