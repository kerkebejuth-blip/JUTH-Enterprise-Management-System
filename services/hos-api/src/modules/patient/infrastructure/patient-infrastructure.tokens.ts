/** Dependency-injection tokens for Patient infrastructure adapters. */
export const PATIENT_INFRASTRUCTURE_TOKENS = {
  repository: Symbol('JUTH_HOS_PATIENT_REPOSITORY'),
  searchRepository: Symbol('JUTH_HOS_PATIENT_SEARCH_REPOSITORY'),
  duplicateDetection: Symbol('JUTH_HOS_PATIENT_DUPLICATE_DETECTION'),
  identifierUniqueness: Symbol('JUTH_HOS_PATIENT_IDENTIFIER_UNIQUENESS'),
  audit: Symbol('JUTH_HOS_PATIENT_AUDIT'),
  medicalRecords: Symbol('JUTH_HOS_PATIENT_MEDICAL_RECORDS'),
  notifications: Symbol('JUTH_HOS_PATIENT_NOTIFICATIONS'),
  applicationEvents: Symbol('JUTH_HOS_PATIENT_APPLICATION_EVENTS'),
  registration: Symbol('JUTH_HOS_PATIENT_REPOSITORY_REGISTRATION'),
} as const;
