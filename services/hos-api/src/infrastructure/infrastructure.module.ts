import { Global, Module } from '@nestjs/common';

import { LoggingModule } from '../logging';
import { DatabaseModule } from '../database';
import {
  CompositeDomainEventDispatcher,
  SystemClock,
  UuidGenerator,
  type DomainEventPublisher,
} from '../shared/domain';
import { LoggingDomainEventPublisher } from './events';
import { INFRASTRUCTURE_TOKENS } from './infrastructure.tokens';
import { PrismaRepositoryFactory } from './repositories';
import { PrismaTransactionManager, PrismaUnitOfWork } from './transactions';

/** Infrastructure adapter module binding domain kernel abstractions to providers. */
@Global()
@Module({
  imports: [DatabaseModule, LoggingModule],
  providers: [
    LoggingDomainEventPublisher,
    PrismaRepositoryFactory,
    PrismaTransactionManager,
    PrismaUnitOfWork,
    {
      provide: INFRASTRUCTURE_TOKENS.clock,
      useClass: SystemClock,
    },
    {
      provide: INFRASTRUCTURE_TOKENS.identifierGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: INFRASTRUCTURE_TOKENS.domainEventPublisher,
      useExisting: LoggingDomainEventPublisher,
    },
    {
      provide: INFRASTRUCTURE_TOKENS.domainEventDispatcher,
      inject: [INFRASTRUCTURE_TOKENS.domainEventPublisher],
      useFactory: (publisher: DomainEventPublisher) =>
        new CompositeDomainEventDispatcher([publisher]),
    },
    {
      provide: INFRASTRUCTURE_TOKENS.repositoryFactory,
      useExisting: PrismaRepositoryFactory,
    },
    {
      provide: INFRASTRUCTURE_TOKENS.transactionManager,
      useExisting: PrismaTransactionManager,
    },
    {
      provide: INFRASTRUCTURE_TOKENS.unitOfWork,
      useExisting: PrismaUnitOfWork,
    },
  ],
  exports: [
    LoggingDomainEventPublisher,
    PrismaRepositoryFactory,
    PrismaTransactionManager,
    PrismaUnitOfWork,
    INFRASTRUCTURE_TOKENS.clock,
    INFRASTRUCTURE_TOKENS.identifierGenerator,
    INFRASTRUCTURE_TOKENS.domainEventPublisher,
    INFRASTRUCTURE_TOKENS.domainEventDispatcher,
    INFRASTRUCTURE_TOKENS.repositoryFactory,
    INFRASTRUCTURE_TOKENS.transactionManager,
    INFRASTRUCTURE_TOKENS.unitOfWork,
  ],
})
export class InfrastructureModule {}
