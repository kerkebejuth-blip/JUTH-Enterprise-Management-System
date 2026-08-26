import type { BusinessRule } from '../../../../shared/domain';
import type { Patient } from '../patient.aggregate';
import type { PatientIdentifier } from '../value-objects/patient-identifiers';

/** Framework-independent duplicate candidate returned by identity matching. */
export interface DuplicateCandidate {
  readonly patientId: string;
  readonly confidenceBand: string;
  readonly evidence: Readonly<Record<string, string>>;
}

/** Domain service contract for explainable duplicate detection. */
export interface DuplicateDetectionService {
  detect(candidate: Patient): Promise<readonly DuplicateCandidate[]>;
}

/** Domain service contract for identity policy evaluation. */
export interface IdentityResolutionService {
  evaluate(patient: Patient, candidate: Patient): readonly BusinessRule[];
}

/** Domain service contract for identifier authority and uniqueness checks. */
export interface PatientIdentifierService {
  isUnique(identifier: PatientIdentifier, patientId?: string): Promise<boolean>;
}
