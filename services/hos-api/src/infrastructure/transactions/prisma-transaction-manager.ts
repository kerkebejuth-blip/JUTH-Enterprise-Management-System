import { Inject, Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import type { PrismaClient } from '@prisma/client';

import { PrismaProvider } from '../../database/providers';
import { InfrastructureException } from '../../filters/exceptions';
import type {
  Clock,
  IdentifierGenerator,
  TransactionContext,
  TransactionManager,
} from '../../shared/domain';
import { INFRASTRUCTURE_TOKENS } from '../infrastructure.tokens';
import { PrismaTransactionContext } from './prisma-transaction-context';

/** Prisma-ready transaction manager for infrastructure transaction scopes. */
@Injectable()
export class PrismaTransactionManager implements TransactionManager {
  private readonly transactions = new Map<string, PrismaTransactionContext>();
  private readonly storage = new AsyncLocalStorage<{
    readonly transaction: PrismaTransactionContext;
    readonly client: TransactionClient;
  }>();

  constructor(
    @Inject(INFRASTRUCTURE_TOKENS.identifierGenerator)
    private readonly identifierGenerator: IdentifierGenerator<string>,
    @Inject(INFRASTRUCTURE_TOKENS.clock)
    private readonly clock: Clock,
    private readonly prismaProvider: PrismaProvider,
  ) {}

  /** Begins a transaction scope with optional nested parent context. */
  begin(parent?: TransactionContext): Promise<TransactionContext> {
    const transaction = new PrismaTransactionContext(
      this.identifierGenerator.generate(),
      this.clock.now(),
      parent?.transactionId,
    );

    this.transactions.set(transaction.transactionId, transaction);
    return Promise.resolve(transaction);
  }

  /** Commits an active transaction scope. */
  commit(transaction: TransactionContext): Promise<void> {
    const activeTransaction = this.getActiveTransaction(transaction);
    activeTransaction.markCommitted();
    this.transactions.delete(activeTransaction.transactionId);
    return Promise.resolve();
  }

  /** Rolls back an active transaction scope. */
  rollback(transaction: TransactionContext): Promise<void> {
    const activeTransaction = this.getActiveTransaction(transaction);
    activeTransaction.markRolledBack();
    this.transactions.delete(activeTransaction.transactionId);
    return Promise.resolve();
  }

  /** Returns the ambient transaction client or the root Prisma client. */
  getClient(): TransactionClient | PrismaClient {
    return this.storage.getStore()?.client ?? this.prismaProvider.getClient();
  }

  /** Executes a callback in a real Prisma transaction. */
  async execute<TResult>(
    operation: (transaction: TransactionContext) => Promise<TResult>,
  ): Promise<TResult> {
    const ambient = this.storage.getStore();

    if (ambient) {
      const nested = await this.begin(ambient.transaction);
      return this.storage.run(
        {
          transaction: nested as PrismaTransactionContext,
          client: ambient.client,
        },
        async () => {
          try {
            const result = await operation(nested);
            await this.commit(nested);
            return result;
          } catch (error) {
            await this.rollback(nested);
            throw error;
          }
        },
      );
    }

    return this.prismaProvider.getClient().$transaction(async (client) => {
      const transaction = await this.begin();
      return this.storage.run(
        { transaction: transaction as PrismaTransactionContext, client },
        async () => {
          try {
            const result = await operation(transaction);
            await this.commit(transaction);
            return result;
          } catch (error) {
            await this.rollback(transaction);
            throw error;
          }
        },
      );
    });
  }

  private getActiveTransaction(
    transaction: TransactionContext,
  ): PrismaTransactionContext {
    const activeTransaction = this.transactions.get(transaction.transactionId);

    if (!activeTransaction) {
      throw new InfrastructureException(
        `Transaction is not active: ${transaction.transactionId}`,
      );
    }

    return activeTransaction;
  }
}

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
>;
