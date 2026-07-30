import { Global, Module } from '@nestjs/common';

import { DatabaseConfiguration } from './config';
import { DatabaseHealthIndicator } from './health';
import { DatabaseObservabilityService } from './observability';
import { PrismaProvider } from './providers';
import { DatabaseService } from './database.service';

/** Global database module for enterprise persistence infrastructure. */
@Global()
@Module({
  providers: [
    DatabaseConfiguration,
    DatabaseHealthIndicator,
    DatabaseObservabilityService,
    PrismaProvider,
    DatabaseService,
  ],
  exports: [
    DatabaseConfiguration,
    DatabaseHealthIndicator,
    DatabaseObservabilityService,
    PrismaProvider,
    DatabaseService,
  ],
})
export class DatabaseModule {}
