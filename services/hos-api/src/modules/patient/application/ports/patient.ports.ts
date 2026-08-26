import type {
  Clock,
  DomainEventDispatcher,
  DomainEventMetadata,
  IdentifierGenerator,
  Repository,
  TransactionContext,
  UnitOfWork,
} from '../../../../shared/domain';
import type { PageResult } from '../../../../database/pagination';
import type { BusinessRule } from '../../../../shared/domain';
import type {
  AuthorizationEvidence,
  DuplicateCandidate,
  Patient,
  PatientDomainDependencies,
  PatientIdentifier,
  PatientSnapshot,
} from '../../domain';
import type { RestorePatientCommand } from '../commands';
import type { PatientApplicationAction } from '../events';
import type { PatientApplicationEvent } from '../events';

/** Patient repository port consumed by application services. */
export type PatientRepository = Repository<Patient, string>;

/** Search criteria passed to the enterprise patient search adapter. */
export interface PatientSearchCriteria {
  readonly term: string;
  readonly page: number;
  readonly pageSize: number;
  readonly sortBy?: 'name' | 'hospitalNumber' | 'updatedAt';
  readonly sortOrder?: 'asc' | 'desc';
}

/** Search port for fast, bounded, clinic-neutral patient retrieval. */
export interface PatientSearchPort {
  search(criteria: PatientSearchCriteria): Promise<PageResult<Patient>>;
}

/** Timeline entry supplied by the shared Digital Patient Folder projection. */
export interface PatientTimelineEntry {
  readonly entryId: string;
  readonly category: string;
  readonly occurredAt: string;
  readonly title: string;
  readonly summary: string;
  readonly source: string;
}

/** Read port for the chronological patient timeline. */
export interface PatientTimelinePort {
  getTimeline(
    patientId: string,
    cursor: string | undefined,
    limit: number,
  ): Promise<{
    readonly entries: readonly PatientTimelineEntry[];
    readonly nextCursor?: string;
    readonly hasNextPage: boolean;
  }>;
}

/** Duplicate-detection port implemented by a future identity adapter. */
export interface DuplicateDetectionPort {
  detect(patient: Patient): Promise<readonly DuplicateCandidate[]>;
}

/** Identity-resolution port for explainable candidate comparison. */
export interface IdentityResolutionPort {
  evaluate(patient: Patient, candidate: Patient): readonly BusinessRule[];
}

/** Domain-facing restoration capability kept outside the application policy. */
export interface PatientRestorationPort {
  restore(
    patient: Patient,
    command: RestorePatientCommand,
    dependencies: PatientDomainDependencies,
  ): void;
}

/** Audit record emitted for an application-level patient operation. */
export interface PatientAuditRecord {
  readonly action: PatientApplicationAction;
  readonly patientId: string;
  readonly occurredAt: string;
  readonly actorId?: string;
  readonly correlationId?: string;
  readonly details: Readonly<Record<string, string>>;
}

/** Audit boundary for attributable patient identity operations. */
export interface PatientAuditPort {
  record(record: PatientAuditRecord): Promise<void>;
}

/** Notification sent to Medical Records after an identity operation. */
export interface MedicalRecordsPatientNotification {
  readonly action: PatientApplicationAction;
  readonly patient: PatientSnapshot;
  readonly eventNames: readonly string[];
  readonly occurredAt: string;
}

/** Medical Records boundary for legal-record filing and continuity signals. */
export interface MedicalRecordsNotificationPort {
  notifyPatientIdentityChanged(
    notification: MedicalRecordsPatientNotification,
  ): Promise<void>;
}

/** Generic enterprise notification contract for downstream subscribers. */
export interface PatientNotification {
  readonly topic: string;
  readonly patientId: string;
  readonly action: PatientApplicationAction;
  readonly occurredAt: string;
}

/** Notification boundary without transport or broker coupling. */
export interface PatientNotificationPort {
  publish(notification: PatientNotification): Promise<void>;
}

/** Application event publisher contract for future enterprise subscribers. */
export interface PatientApplicationEventPublisher {
  publish(event: PatientApplicationEvent): Promise<void>;
}

/** Dependencies shared by thin Patient application services. */
export interface PatientApplicationDependencies {
  readonly repository: PatientRepository;
  readonly unitOfWork: UnitOfWork;
  readonly clock: Clock;
  readonly identifierGenerator: IdentifierGenerator;
  readonly domainEventDispatcher: DomainEventDispatcher;
  readonly audit: PatientAuditPort;
  readonly medicalRecords: MedicalRecordsNotificationPort;
  readonly notifications: PatientNotificationPort;
  readonly applicationEvents: PatientApplicationEventPublisher;
}

/** Transaction callback shape retained for adapters that need transaction context. */
export type PatientApplicationOperation<TResult> = (
  transaction: TransactionContext,
) => Promise<TResult>;

/** Identifier uniqueness port for future registration policy checks. */
export interface PatientIdentifierUniquenessPort {
  isUnique(identifier: PatientIdentifier, patientId?: string): Promise<boolean>;
}

/** Immutable identity reference used by integration notifications. */
export interface PatientIdentityReference {
  readonly patientId: string;
  readonly enterprisePatientNumber: string;
  readonly hospitalNumber: string;
  readonly metadata?: Readonly<DomainEventMetadata>;
}

/** Authorization evidence port for policy-aware application workflows. */
export interface PatientAuthorizationPort {
  authorize(
    action: PatientApplicationAction,
    patientId: string,
    evidence: AuthorizationEvidence,
  ): Promise<void>;
}
