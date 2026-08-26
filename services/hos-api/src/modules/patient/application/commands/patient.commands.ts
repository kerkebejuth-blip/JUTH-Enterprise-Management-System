import type { AuthorizationEvidence } from '../../domain';
import type { PatientProvenanceDto, RegistrationDto, UpdateDto } from '../dto';

/** Command for registering a new lifelong Patient identity aggregate. */
export interface RegisterPatientCommand extends RegistrationDto {
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}

/** Command for updating approved administrative patient data. */
export interface UpdatePatientCommand extends UpdateDto {
  readonly patientId: string;
  readonly expectedVersion: number;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}

/** Command for controlled archival without deleting the legal record. */
export interface ArchivePatientCommand {
  readonly patientId: string;
  readonly expectedVersion: number;
  readonly reason: string;
  readonly provenance: PatientProvenanceDto;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}

/** Command for an explicitly authorized source-to-survivor identity merge. */
export interface MergePatientCommand {
  readonly sourcePatientId: string;
  readonly survivorPatientId: string;
  readonly sourceExpectedVersion: number;
  readonly authorization: AuthorizationEvidence;
  readonly provenance: PatientProvenanceDto;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}

/** Command for a provenance-preserving identity split decision. */
export interface SplitPatientCommand {
  readonly patientId: string;
  readonly resultingPatientId: string;
  readonly expectedVersion: number;
  readonly provenance: PatientProvenanceDto;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}

/** Command for restoring an archived identity through an approved domain port. */
export interface RestorePatientCommand {
  readonly patientId: string;
  readonly expectedVersion: number;
  readonly authorization: AuthorizationEvidence;
  readonly provenance: PatientProvenanceDto;
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly tenantId?: string;
  readonly facilityId?: string;
}
