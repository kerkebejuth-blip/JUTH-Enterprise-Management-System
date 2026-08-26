import { Injectable } from '@nestjs/common';

import type { PatientApplicationEventPublisher } from '../application/ports';
import type { PatientApplicationEvent } from '../application/events';

/** Composes application event publishers for future message-bus registration. */
@Injectable()
export class CompositePatientApplicationEventPublisher implements PatientApplicationEventPublisher {
  constructor(
    private readonly publishers: readonly PatientApplicationEventPublisher[],
  ) {}

  /** Publishes to every configured publisher without selecting a transport. */
  async publish(event: PatientApplicationEvent): Promise<void> {
    await Promise.all(
      this.publishers.map((publisher) => publisher.publish(event)),
    );
  }
}
