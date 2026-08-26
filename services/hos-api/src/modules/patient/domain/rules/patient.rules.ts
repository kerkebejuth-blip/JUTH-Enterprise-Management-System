import type { BusinessRule } from '../../../../shared/domain';
import { IdentifierStatus } from '../enums';
import type { AuthorizationEvidence } from '../patient.types';
import type { PatientIdentifier } from '../value-objects/patient-identifiers';
import type { PatientName } from '../value-objects/patient-demographics';
import type { Provenance } from '../value-objects/provenance';

/** Ensures a Patient has the mandatory administrative identity values. */
export class MandatoryPatientDemographicsRule implements BusinessRule {
  readonly message = 'Patient must have a name, date of birth, and gender.';

  /** Creates a rule for a candidate Patient identity. */
  constructor(
    private readonly name: PatientName | undefined,
    private readonly dateOfBirth: unknown,
    private readonly gender: unknown,
  ) {}

  /** Returns true when mandatory identity data is missing. */
  isBroken(): boolean {
    return (
      this.name === undefined ||
      this.dateOfBirth === undefined ||
      this.gender === undefined
    );
  }
}

/** Ensures active identifiers are unique within one aggregate candidate. */
export class PatientIdentifierUniquenessRule implements BusinessRule {
  readonly message =
    'Active patient identifiers must be unique within their authority scope.';

  /** Creates a uniqueness rule for the aggregate identifier collection. */
  constructor(private readonly identifiers: readonly PatientIdentifier[]) {}

  /** Returns true when two active identifiers share type, authority, and value. */
  isBroken(): boolean {
    const active = this.identifiers.filter(
      (identifier) =>
        identifier.status === IdentifierStatus.Active ||
        identifier.status === IdentifierStatus.Verified,
    );
    const keys = active.map(
      (identifier) =>
        `${identifier.type}:${identifier.assigningAuthority}:${identifier.value}`,
    );

    return new Set(keys).size !== keys.length;
  }
}

/** Ensures a merge includes explicit authorization evidence. */
export class MergeRequiresAuthorizationRule implements BusinessRule {
  readonly message = 'Patient merge requires explicit authorization evidence.';

  /** Creates a merge authorization rule. */
  constructor(
    private readonly authorization: AuthorizationEvidence | undefined,
  ) {}

  /** Returns true when required authorization fields are incomplete. */
  isBroken(): boolean {
    return (
      this.authorization === undefined ||
      this.authorization.authorizedBy.trim().length === 0 ||
      this.authorization.authorizationReference.trim().length === 0 ||
      this.authorization.reason.trim().length === 0
    );
  }
}

/** Ensures a split operation carries explicit provenance. */
export class SplitPreservesProvenanceRule implements BusinessRule {
  readonly message = 'Patient split must preserve provenance.';

  /** Creates a split provenance rule. */
  constructor(private readonly provenance: Provenance | undefined) {}

  /** Returns true when provenance is absent. */
  isBroken(): boolean {
    return this.provenance === undefined;
  }
}

/** Ensures immutable identity values are not changed by demographic updates. */
export class PatientIdentityImmutableRule implements BusinessRule {
  readonly message =
    'Technical patient identity and assigned numbers are immutable.';

  /** Creates an identity immutability rule. */
  constructor(
    private readonly currentPatientId: string,
    private readonly candidatePatientId: string,
    private readonly currentEnterpriseNumber: string,
    private readonly candidateEnterpriseNumber: string,
    private readonly currentHospitalNumber: string,
    private readonly candidateHospitalNumber: string,
  ) {}

  /** Returns true when any immutable identity value differs. */
  isBroken(): boolean {
    return (
      this.currentPatientId !== this.candidatePatientId ||
      this.currentEnterpriseNumber !== this.candidateEnterpriseNumber ||
      this.currentHospitalNumber !== this.candidateHospitalNumber
    );
  }
}
