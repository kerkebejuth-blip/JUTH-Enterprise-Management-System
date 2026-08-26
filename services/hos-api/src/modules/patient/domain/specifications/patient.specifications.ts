import { CompositeSpecification } from '../../../../shared/domain';
import { PatientStatus } from '../enums/patient.enums';
import type { Patient } from '../patient.aggregate';

/** Matches patients in a requested lifecycle state. */
export class PatientHasStatusSpecification extends CompositeSpecification<Patient> {
  /** Creates a status specification. */
  constructor(private readonly status: PatientStatus) {
    super();
  }

  /** Returns true when the patient has the requested state. */
  isSatisfiedBy(candidate: Patient): boolean {
    return candidate.status === this.status;
  }
}

/** Matches patients that may participate in a governed merge. */
export class PatientCanBeMergedSpecification extends CompositeSpecification<Patient> {
  /** Returns true for active or inactive patients that are not already archived or merged. */
  isSatisfiedBy(candidate: Patient): boolean {
    return (
      candidate.status === PatientStatus.Active ||
      candidate.status === PatientStatus.Inactive
    );
  }
}

/** Matches patients that are not in controlled archive state. */
export class PatientIsNotArchivedSpecification extends CompositeSpecification<Patient> {
  /** Returns true for every non-archived patient. */
  isSatisfiedBy(candidate: Patient): boolean {
    return candidate.status !== PatientStatus.Archived;
  }
}
