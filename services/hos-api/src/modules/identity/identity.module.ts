import { Module } from '@nestjs/common';

import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';

/** Enterprise identity and access management platform module. */
@Module({
  controllers: [IdentityController],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
