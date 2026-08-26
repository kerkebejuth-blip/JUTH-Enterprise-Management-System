import {
  DomainEvent,
  type DomainEventMetadata,
} from '../../../../shared/domain';
import type { PatientStatus } from '../enums/patient.enums';
import type { PatientSnapshot } from '../patient.types';

/** Payload emitted when a Patient aggregate is first created. */
export interface PatientRegisteredPayload extends PatientSnapshot {
  readonly provenance: Readonly<Record<string, string>>;
}

/** Domain event emitted after Patient aggregate creation. */
export class PatientRegistered extends DomainEvent<PatientRegisteredPayload> {
  /** Creates a PatientRegistered event. */
  constructor(
    eventId: string,
    occurredAt: Date,
    payload: PatientRegisteredPayload,
    metadata: DomainEventMetadata = {},
  ) {
    super(
      eventId,
      'PatientRegistered',
      1,
      occurredAt,
      payload,
      metadata,
      payload.patientId,
    );
  }
}

/** Payload emitted when approved administrative identity data changes. */
export interface PatientUpdatedPayload {
  readonly patientId: string;
  readonly changedFields: readonly string[];
  readonly version: number;
  readonly status: PatientStatus;
  readonly provenance: Readonly<Record<string, string>>;
}

/** Domain event emitted after a Patient demographic update. */
export class PatientUpdated extends DomainEvent<PatientUpdatedPayload> {
  /** Creates a PatientUpdated event. */
  constructor(
    eventId: string,
    occurredAt: Date,
    payload: PatientUpdatedPayload,
    metadata: DomainEventMetadata = {},
  ) {
    super(
      eventId,
      'PatientUpdated',
      1,
      occurredAt,
      payload,
      metadata,
      payload.patientId,
    );
  }
}

/** Payload emitted when a Patient enters controlled archive state. */
export interface PatientArchivedPayload {
  readonly patientId: string;
  readonly reason: string;
  readonly version: number;
  readonly status: PatientStatus;
}

/** Domain event emitted after patient archival. */
export class PatientArchived extends DomainEvent<PatientArchivedPayload> {
  /** Creates a PatientArchived event. */
  constructor(
    eventId: string,
    occurredAt: Date,
    payload: PatientArchivedPayload,
    metadata: DomainEventMetadata = {},
  ) {
    super(
      eventId,
      'PatientArchived',
      1,
      occurredAt,
      payload,
      metadata,
      payload.patientId,
    );
  }
}

/** Payload emitted when a source patient is merged into a survivor. */
export interface PatientMergedPayload {
  readonly sourcePatientId: string;
  readonly survivorPatientId: string;
  readonly authorizationReference: string;
  readonly reason: string;
  readonly provenance: Readonly<Record<string, string>>;
  readonly version: number;
}

/** Domain event emitted after a governed patient merge decision is applied. */
export class PatientMerged extends DomainEvent<PatientMergedPayload> {
  /** Creates a PatientMerged event. */
  constructor(
    eventId: string,
    occurredAt: Date,
    payload: PatientMergedPayload,
    metadata: DomainEventMetadata = {},
  ) {
    super(
      eventId,
      'PatientMerged',
      1,
      occurredAt,
      payload,
      metadata,
      payload.survivorPatientId,
    );
  }
}

/** Payload emitted when identity information is split with preserved provenance. */
export interface PatientSplitPayload {
  readonly originalPatientId: string;
  readonly resultingPatientId: string;
  readonly provenance: Readonly<Record<string, string>>;
  readonly version: number;
}

/** Domain event emitted after an approved split operation is recorded. */
export class PatientSplit extends DomainEvent<PatientSplitPayload> {
  /** Creates a PatientSplit event. */
  constructor(
    eventId: string,
    occurredAt: Date,
    payload: PatientSplitPayload,
    metadata: DomainEventMetadata = {},
  ) {
    super(
      eventId,
      'PatientSplit',
      1,
      occurredAt,
      payload,
      metadata,
      payload.originalPatientId,
    );
  }
}
