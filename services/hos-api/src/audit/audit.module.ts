import { Global, Module } from '@nestjs/common';

import { AuditService } from './audit.service';
import { LoggingAuditPublisher } from './logging-audit.publisher';

/** Global audit foundation module for future compliance workflows. */
@Global()
@Module({
  providers: [AuditService, LoggingAuditPublisher],
  exports: [AuditService, LoggingAuditPublisher],
})
export class AuditModule {}
