import { Global, Module } from '@nestjs/common';

import { AuditModule } from '../audit';
import { DatabaseModule } from '../database';

/** Global shared module exporting reusable enterprise providers. */
@Global()
@Module({
  imports: [AuditModule, DatabaseModule],
  exports: [AuditModule, DatabaseModule],
})
export class SharedModule {}
