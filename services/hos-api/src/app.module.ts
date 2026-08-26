import { Module } from '@nestjs/common';

import { CoreModule } from './core';
import { HealthModule } from './health';
import { IdentityModule } from './modules/identity';
import { PatientModule } from './modules/patient/patient.module';

/** Root application module composing enterprise platform foundations. */
@Module({
  imports: [CoreModule, HealthModule, IdentityModule, PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
