import { Module } from '@nestjs/common';

import { CoreModule } from './core';
import { HealthModule } from './health';
import { IdentityModule } from './modules/identity';

/** Root application module composing enterprise platform foundations. */
@Module({
  imports: [CoreModule, HealthModule, IdentityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
