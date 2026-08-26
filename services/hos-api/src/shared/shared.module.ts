import { Global, Module } from '@nestjs/common';

import { AuditModule } from '../audit';
import { DatabaseModule } from '../database';
import { InfrastructureModule } from '../infrastructure';

/** Global shared module exporting reusable enterprise providers. */
@Global()
@Module({
  imports: [AuditModule, DatabaseModule, InfrastructureModule],
  exports: [AuditModule, DatabaseModule, InfrastructureModule],
})
export class SharedModule {}
