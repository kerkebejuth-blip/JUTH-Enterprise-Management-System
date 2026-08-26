/** Lifecycle states for a patient identity aggregate. */
export enum PatientStatus {
  Provisional = 'provisional',
  Active = 'active',
  Inactive = 'inactive',
  Deceased = 'deceased',
  Merged = 'merged',
  Archived = 'archived',
}

/** Lifecycle states for a patient identifier. */
export enum IdentifierStatus {
  Proposed = 'proposed',
  Active = 'active',
  Verified = 'verified',
  Retired = 'retired',
  Rejected = 'rejected',
}

/** Administrative gender codes supported by the domain boundary. */
export enum GenderCode {
  Female = 'female',
  Male = 'male',
  Intersex = 'intersex',
  Unknown = 'unknown',
  NotApplicable = 'not_applicable',
  NotRecorded = 'not_recorded',
}

/** Identifier categories used by the Patient context. */
export enum PatientIdentifierType {
  Enterprise = 'enterprise',
  Facility = 'facility',
  National = 'national',
  Passport = 'passport',
  Insurance = 'insurance',
  External = 'external',
  Temporary = 'temporary',
}
