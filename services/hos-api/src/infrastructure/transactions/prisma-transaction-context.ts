import type { TransactionContext } from '../../shared/domain';

export type TransactionState = 'active' | 'committed' | 'rolled_back';

/** Infrastructure transaction context used by Prisma transaction orchestration. */
export class PrismaTransactionContext implements TransactionContext {
  private state: TransactionState = 'active';

  constructor(
    public readonly transactionId: string,
    public readonly startedAt: Date,
    public readonly parentTransactionId?: string,
  ) {}

  /** Returns the current transaction lifecycle state. */
  get currentState(): TransactionState {
    return this.state;
  }

  /** Marks the transaction as committed. */
  markCommitted(): void {
    this.state = 'committed';
  }

  /** Marks the transaction as rolled back. */
  markRolledBack(): void {
    this.state = 'rolled_back';
  }

  /** Indicates whether this transaction is nested under another scope. */
  get isNested(): boolean {
    return this.parentTransactionId !== undefined;
  }
}
