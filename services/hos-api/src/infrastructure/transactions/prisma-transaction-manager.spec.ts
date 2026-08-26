import type {
  Clock,
  IdentifierGenerator,
  TransactionContext,
  TransactionManager,
} from '../../shared';
import { PrismaTransactionManager } from './prisma-transaction-manager';
import { PrismaUnitOfWork } from './prisma-unit-of-work';
import { PrismaProvider } from '../../database/providers';

class FixedIdentifierGenerator implements IdentifierGenerator<string> {
  private current = 0;

  generate(): string {
    this.current += 1;
    return `transaction-${this.current}`;
  }
}

class FixedClock implements Clock {
  now(): Date {
    return new Date('2026-08-02T00:00:00.000Z');
  }

  nowIso(): string {
    return this.now().toISOString();
  }
}

class CapturingTransactionManager implements TransactionManager {
  readonly calls: string[] = [];
  private readonly transaction: TransactionContext = {
    transactionId: 'transaction-1',
    startedAt: new Date('2026-08-02T00:00:00.000Z'),
  };

  begin(): Promise<TransactionContext> {
    this.calls.push('begin');
    return Promise.resolve(this.transaction);
  }

  commit(): Promise<void> {
    this.calls.push('commit');
    return Promise.resolve();
  }

  rollback(): Promise<void> {
    this.calls.push('rollback');
    return Promise.resolve();
  }
}

describe('Prisma transaction adapters', () => {
  it('creates root and nested transaction contexts', async () => {
    const manager = new PrismaTransactionManager(
      new FixedIdentifierGenerator(),
      new FixedClock(),
      Object.create(PrismaProvider.prototype) as PrismaProvider,
    );

    const root = await manager.begin();
    const child = await manager.begin(root);

    expect(root.transactionId).toBe('transaction-1');
    expect(child).toMatchObject({
      transactionId: 'transaction-2',
      parentTransactionId: 'transaction-1',
    });

    await manager.commit(child);
    await manager.rollback(root);
  });

  it('commits successful unit of work operations', async () => {
    const manager = new CapturingTransactionManager();
    const unitOfWork = new PrismaUnitOfWork(manager);

    await expect(
      unitOfWork.execute((transaction) =>
        Promise.resolve(transaction.transactionId),
      ),
    ).resolves.toBe('transaction-1');

    expect(manager.calls).toEqual(['begin', 'commit']);
  });

  it('rolls back failed unit of work operations', async () => {
    const manager = new CapturingTransactionManager();
    const unitOfWork = new PrismaUnitOfWork(manager);

    await expect(
      unitOfWork.execute(() => Promise.reject(new Error('failed'))),
    ).rejects.toThrow('failed');

    expect(manager.calls).toEqual(['begin', 'rollback']);
  });
});
