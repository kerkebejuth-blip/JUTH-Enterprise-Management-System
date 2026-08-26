import { type TestingModule, Test } from '@nestjs/testing';

import type {
  Clock,
  DomainEventDispatcher,
  DomainEventPublisher,
  IdentifierGenerator,
  TransactionManager,
  UnitOfWork,
} from '../shared';
import { InfrastructureModule } from './infrastructure.module';
import { INFRASTRUCTURE_TOKENS } from './infrastructure.tokens';
import { PrismaRepositoryFactory } from './repositories';

describe('InfrastructureModule', () => {
  let moduleRef: TestingModule | undefined;

  afterEach(async () => {
    if (!moduleRef) {
      return;
    }

    await moduleRef.close();
    moduleRef = undefined;
  });

  it('registers infrastructure adapters for domain kernel abstractions', async () => {
    moduleRef = await Test.createTestingModule({
      imports: [InfrastructureModule],
    }).compile();

    expect(
      moduleRef.get<Clock>(INFRASTRUCTURE_TOKENS.clock).now(),
    ).toBeInstanceOf(Date);
    expect(
      moduleRef
        .get<IdentifierGenerator<string>>(
          INFRASTRUCTURE_TOKENS.identifierGenerator,
        )
        .generate(),
    ).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(
      moduleRef.get<DomainEventPublisher>(
        INFRASTRUCTURE_TOKENS.domainEventPublisher,
      ),
    ).toBeDefined();
    expect(
      moduleRef.get<DomainEventDispatcher>(
        INFRASTRUCTURE_TOKENS.domainEventDispatcher,
      ),
    ).toBeDefined();
    expect(
      moduleRef.get<TransactionManager>(
        INFRASTRUCTURE_TOKENS.transactionManager,
      ),
    ).toBeDefined();
    expect(
      moduleRef.get<UnitOfWork>(INFRASTRUCTURE_TOKENS.unitOfWork),
    ).toBeDefined();
    expect(
      moduleRef.get<PrismaRepositoryFactory>(
        INFRASTRUCTURE_TOKENS.repositoryFactory,
      ),
    ).toBeInstanceOf(PrismaRepositoryFactory);
  });
});
