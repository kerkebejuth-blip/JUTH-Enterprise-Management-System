import type {
  Clock,
  DomainEventMetadata,
  IdentifierGenerator,
} from '../../../shared/domain';
import type { PatientDomainDependencies, Patient } from '../domain';
import { PatientConcurrencyException } from './exceptions';

/** Command metadata accepted by Patient application orchestration. */
export interface PatientApplicationMetadataInput {
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}

/** Creates domain event metadata without introducing transport assumptions. */
export function toDomainEventMetadata(
  input: PatientApplicationMetadataInput,
): DomainEventMetadata {
  return {
    ...(input.correlationId === undefined
      ? {}
      : { correlationId: input.correlationId }),
    ...(input.causationId === undefined
      ? {}
      : { causationId: input.causationId }),
    ...(input.userId === undefined ? {} : { userId: input.userId }),
    ...(input.tenantId === undefined ? {} : { tenantId: input.tenantId }),
    ...(input.facilityId === undefined ? {} : { facilityId: input.facilityId }),
  };
}

/** Creates pure domain dependencies for an application command. */
export function createPatientDomainDependencies(
  input: PatientApplicationMetadataInput,
  clock: Clock,
  identifierGenerator: IdentifierGenerator,
): PatientDomainDependencies {
  return {
    clock,
    identifierGenerator,
    eventMetadata: toDomainEventMetadata(input),
  };
}

/** Enforces optimistic concurrency before operations without domain support. */
export function assertExpectedVersion(
  patient: Patient,
  expectedVersion: number,
): void {
  if (patient.version !== expectedVersion) {
    throw new PatientConcurrencyException(
      patient.patientId.value,
      expectedVersion,
      patient.version,
    );
  }
}
