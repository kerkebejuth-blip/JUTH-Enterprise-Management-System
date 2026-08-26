import { Injectable } from '@nestjs/common';

import { EnterpriseLoggerService } from '../../../../logging';
import type {
  MedicalRecordsNotificationPort,
  PatientApplicationEventPublisher,
  PatientAuditPort,
  PatientNotificationPort,
} from '../../application/ports';

/** Logging-backed audit adapter pending the enterprise audit store. */
@Injectable()
export class LoggingPatientAuditAdapter implements PatientAuditPort {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Records an attributable Patient operation through the logging boundary. */
  record(record: Parameters<PatientAuditPort['record']>[0]): Promise<void> {
    this.logger.audit('Patient identity audit event', {
      action: record.action,
      patientId: record.patientId,
      occurredAt: record.occurredAt,
      actorId: record.actorId,
      correlationId: record.correlationId,
      details: record.details,
    });
    return Promise.resolve();
  }
}

/** Logging-backed Medical Records notification adapter. */
@Injectable()
export class LoggingMedicalRecordsNotificationAdapter implements MedicalRecordsNotificationPort {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Emits a continuity signal for the future Medical Records adapter. */
  notifyPatientIdentityChanged(
    notification: Parameters<
      MedicalRecordsNotificationPort['notifyPatientIdentityChanged']
    >[0],
  ): Promise<void> {
    this.logger.application('Medical Records patient identity notification', {
      action: notification.action,
      patientId: notification.patient.patientId,
    });
    return Promise.resolve();
  }
}

/** Logging-backed downstream notification adapter. */
@Injectable()
export class LoggingPatientNotificationAdapter implements PatientNotificationPort {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Emits a structured notification hook without a transport dependency. */
  publish(
    notification: Parameters<PatientNotificationPort['publish']>[0],
  ): Promise<void> {
    this.logger.application('Patient notification published', {
      topic: notification.topic,
      patientId: notification.patientId,
      action: notification.action,
      occurredAt: notification.occurredAt,
    });
    return Promise.resolve();
  }
}

/** Logging-backed application event adapter pending a message bus. */
@Injectable()
export class LoggingPatientApplicationEventPublisher implements PatientApplicationEventPublisher {
  constructor(private readonly logger: EnterpriseLoggerService) {}

  /** Publishes an application event to the infrastructure observability hook. */
  publish(
    event: Parameters<PatientApplicationEventPublisher['publish']>[0],
  ): Promise<void> {
    this.logger.application(`Patient application event: ${event.eventName}`, {
      patientId: event.patientId,
      eventId: event.eventId,
    });
    return Promise.resolve();
  }
}
