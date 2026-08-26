/** Persistence-independent transaction context for application orchestration. */
export interface TransactionContext {
  readonly transactionId: string;
  readonly parentTransactionId?: string;
  readonly startedAt: Date;
}

/** Transaction manager abstraction for beginning, committing, and rolling back work. */
export interface TransactionManager {
  begin(parent?: TransactionContext): Promise<TransactionContext>;
  commit(transaction: TransactionContext): Promise<void>;
  rollback(transaction: TransactionContext): Promise<void>;
}

/** Unit of Work abstraction for atomic domain operations. */
export interface UnitOfWork {
  execute<TResult>(
    operation: (transaction: TransactionContext) => Promise<TResult>,
  ): Promise<TResult>;
}
