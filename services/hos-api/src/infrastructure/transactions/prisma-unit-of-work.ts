import { Inject, Injectable } from '@nestjs/common';

import type {
  TransactionContext,
  TransactionManager,
  UnitOfWork,
} from '../../shared/domain';
import { INFRASTRUCTURE_TOKENS } from '../infrastructure.tokens';

interface ExecutableTransactionManager extends TransactionManager {
  execute<TResult>(
    operation: (transaction: TransactionContext) => Promise<TResult>,
  ): Promise<TResult>;
}

/** Prisma-ready Unit of Work adapter for atomic application operations. */
@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  constructor(
    @Inject(INFRASTRUCTURE_TOKENS.transactionManager)
    private readonly transactionManager: TransactionManager,
  ) {}

  /** Executes an operation inside a managed transaction lifecycle. */
  async execute<TResult>(
    operation: (transaction: TransactionContext) => Promise<TResult>,
  ): Promise<TResult> {
    if (isExecutableTransactionManager(this.transactionManager)) {
      return this.transactionManager.execute(operation);
    }

    const transaction = await this.transactionManager.begin();
    try {
      const result = await operation(transaction);
      await this.transactionManager.commit(transaction);
      return result;
    } catch (error) {
      await this.transactionManager.rollback(transaction);
      throw error;
    }
  }
}

function isExecutableTransactionManager(
  manager: TransactionManager,
): manager is ExecutableTransactionManager {
  return 'execute' in manager && typeof manager.execute === 'function';
}
