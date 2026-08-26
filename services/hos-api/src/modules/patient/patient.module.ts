import { Module } from '@nestjs/common';

import { PatientApplicationCompositionModule } from './composition';
import { PatientController } from './presentation';

/** Patient bounded-context composition root for approved platform adapters. */
@Module({
  imports: [PatientApplicationCompositionModule],
  controllers: [PatientController],
  exports: [PatientApplicationCompositionModule],
})
export class PatientModule {}
