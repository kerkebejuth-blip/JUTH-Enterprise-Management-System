import { Global, Module } from '@nestjs/common';

import { EnterpriseLoggerService } from './enterprise-logger.service';

/** Global logging module for enterprise infrastructure services. */
@Global()
@Module({
  providers: [EnterpriseLoggerService],
  exports: [EnterpriseLoggerService],
})
export class LoggingModule {}
