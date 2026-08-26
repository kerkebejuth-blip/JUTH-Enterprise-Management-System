import type {
  Clock,
  DomainEventMetadata,
  IdentifierGenerator,
} from '../../../shared/domain';
import type {
  DateOfBirth,
  EmailAddress,
  EnterprisePatientNumber,
  Gender,
  HospitalNumber,
  NextOfKin,
  PatientId,
  PatientIdentifier,
  PatientName,
  PhoneNumber,
  Provenance,
  ResidentialAddress,
} from './value-objects';
import type { PatientStatus } from './enums';

/** Dependencies supplied to the pure Patient aggregate by an outer layer. */
export interface PatientDomainDependencies {
  readonly clock: Clock;
  readonly identifierGenerator: IdentifierGenerator;
  readonly eventMetadata?: DomainEventMetadata;
}

/** Input required to create a Patient identity aggregate. */
export interface PatientCreateInput {
  readonly patientId?: PatientId;
  readonly enterprisePatientNumber: EnterprisePatientNumber;
  readonly hospitalNumber: HospitalNumber;
  readonly name: PatientName;
  readonly dateOfBirth: DateOfBirth;
  readonly gender: Gender;
  readonly phoneNumber?: PhoneNumber;
  readonly emailAddress?: EmailAddress;
  readonly residentialAddress?: ResidentialAddress;
  readonly nextOfKin?: NextOfKin;
  readonly identifiers?: readonly PatientIdentifier[];
  readonly status: PatientStatus;
  readonly provenance: Provenance;
}

/** Persistence rehydration input that must not emit a registration event. */
export interface PatientRehydrationInput {
  readonly patientId: PatientId;
  readonly enterprisePatientNumber: EnterprisePatientNumber;
  readonly hospitalNumber: HospitalNumber;
  readonly name: PatientName;
  readonly dateOfBirth: DateOfBirth;
  readonly gender: Gender;
  readonly phoneNumber?: PhoneNumber;
  readonly emailAddress?: EmailAddress;
  readonly residentialAddress?: ResidentialAddress;
  readonly nextOfKin?: NextOfKin;
  readonly identifiers: readonly PatientIdentifier[];
  readonly status: PatientStatus;
  readonly provenance: Provenance;
  readonly version: number;
  readonly updatedAt: string;
}

/** Approved fields that may be changed through a demographic update. */
export interface PatientUpdateInput {
  readonly expectedVersion: number;
  readonly name?: PatientName;
  readonly dateOfBirth?: DateOfBirth;
  readonly gender?: Gender;
  readonly phoneNumber?: PhoneNumber;
  readonly emailAddress?: EmailAddress;
  readonly residentialAddress?: ResidentialAddress;
  readonly nextOfKin?: NextOfKin;
  readonly provenance: Provenance;
}

/** Evidence that a privileged identity operation was approved. */
export interface AuthorizationEvidence {
  readonly authorizedBy: string;
  readonly authorizationReference: string;
  readonly reason: string;
}

/** Immutable evidence used when an identity is merged or split. */
export interface PatientSnapshot {
  readonly patientId: string;
  readonly enterprisePatientNumber: string;
  readonly hospitalNumber: string;
  readonly name: string;
  readonly dateOfBirth: string;
  readonly gender: string;
  readonly status: PatientStatus;
  readonly version: number;
}
