export { Patient } from './patient.aggregate';
export { PatientDomainError } from './errors/patient-domain.error';
export {
  GenderCode,
  IdentifierStatus,
  PatientIdentifierType,
  PatientStatus,
} from './enums';
export {
  PatientArchived,
  PatientMerged,
  PatientRegistered,
  PatientSplit,
  PatientUpdated,
} from './events/patient.events';
export type {
  PatientArchivedPayload,
  PatientMergedPayload,
  PatientRegisteredPayload,
  PatientSplitPayload,
  PatientUpdatedPayload,
} from './events/patient.events';
export type {
  AuthorizationEvidence,
  PatientCreateInput,
  PatientDomainDependencies,
  PatientSnapshot,
  PatientRehydrationInput,
  PatientUpdateInput,
} from './patient.types';
export type {
  DuplicateCandidate,
  DuplicateDetectionService,
  IdentityResolutionService,
  PatientIdentifierService,
} from './services/patient.domain-services';
export {
  PatientCanBeMergedSpecification,
  PatientHasStatusSpecification,
  PatientIsNotArchivedSpecification,
} from './specifications/patient.specifications';
export {
  MandatoryPatientDemographicsRule,
  MergeRequiresAuthorizationRule,
  PatientIdentifierUniquenessRule,
  PatientIdentityImmutableRule,
  SplitPreservesProvenanceRule,
} from './rules/patient.rules';
export {
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
export type { PatientIdentifierProperties } from './value-objects';
