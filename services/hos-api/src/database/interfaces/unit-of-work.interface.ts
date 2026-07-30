import type { Transaction } from './transaction.interface';

/** Coordinates atomic persistence operations across repositories. */
export interface UnitOfWork {
  begin(): Promise<Transaction>;
  execute<TResult>(
    operation: (transaction: Transaction) => Promise<TResult>,
  ): Promise<TResult>;
}
