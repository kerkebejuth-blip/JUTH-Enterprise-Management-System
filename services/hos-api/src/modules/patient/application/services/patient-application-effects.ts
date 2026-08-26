import type {
  Clock,
  DomainEventDispatcher,
  IdentifierGenerator,
} from '../../../../shared/domain';
import type { Patient } from '../../domain';
import type {
  PatientApplicationAction,
  PatientApplicationEvent,
} from '../events';
import type { PatientApplicationMetadataInput } from '../utils';
import { PatientMapper } from '../mappers';
import type {
  MedicalRecordsNotificationPort,
  PatientApplicationEventPublisher,
  PatientAuditPort,
  PatientNotificationPort,
} from '../ports';

/** Coordinates post-persistence side effects without owning business rules. */
export class PatientApplicationEffects {
  constructor(
    private readonly clock: Clock,
    private readonly identifierGenerator: IdentifierGenerator,
    private readonly domainEventDispatcher: DomainEventDispatcher,
    private readonly audit: PatientAuditPort,
    private readonly medicalRecords: MedicalRecordsNotificationPort,
    private readonly notifications: PatientNotificationPort,
    private readonly applicationEvents: PatientApplicationEventPublisher,
  ) {}

  /** Publishes domain, audit, Medical Records, and application continuity signals. */
  async complete(
    patient: Patient,
    action: PatientApplicationAction,
    metadata: PatientApplicationMetadataInput,
  ): Promise<void> {
    const domainEvents = patient.domainEvents;
    const occurredAt = this.clock.nowIso();
    const snapshot = PatientMapper.toSnapshot(patient);

    await this.domainEventDispatcher.dispatchAll(domainEvents);
    await this.audit.record({
      action,
      patientId: patient.patientId.value,
      occurredAt,
      actorId: metadata.userId,
      correlationId: metadata.correlationId,
      details: {
        eventCount: domainEvents.length.toString(),
        status: patient.status,
      },
    });
    await this.medicalRecords.notifyPatientIdentityChanged({
      action,
      patient: snapshot,
      eventNames: domainEvents.map((event) => event.eventName),
      occurredAt,
    });
    await this.notifications.publish({
      topic: 'patient.identity.changed',
      patientId: patient.patientId.value,
      action,
      occurredAt,
    });

    const applicationEvent: PatientApplicationEvent = {
      eventId: this.identifierGenerator.generate(),
      eventName: this.completedEventName(action),
      patientId: patient.patientId.value,
      occurredAt,
      ...(metadata.correlationId === undefined
        ? {}
        : { correlationId: metadata.correlationId }),
      ...(metadata.causationId === undefined
        ? {}
        : { causationId: metadata.causationId }),
      ...(metadata.userId === undefined ? {} : { userId: metadata.userId }),
      ...(metadata.tenantId === undefined
        ? {}
        : { tenantId: metadata.tenantId }),
      ...(metadata.facilityId === undefined
        ? {}
        : { facilityId: metadata.facilityId }),
    };

    await this.applicationEvents.publish(applicationEvent);
    patient.clearDomainEvents();
  }

  private completedEventName(action: PatientApplicationAction): string {
    return (
      'Patient' + action.charAt(0).toUpperCase() + action.slice(1) + 'Completed'
    );
  }
}
