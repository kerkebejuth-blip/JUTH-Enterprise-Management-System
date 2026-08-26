/** Dependency-injection tokens for the Patient application composition boundary. */
export const PATIENT_COMPOSITION_TOKENS = {
  patientRepository: Symbol('JUTH_HOS_PATIENT_APPLICATION_REPOSITORY'),
  patientSearch: Symbol('JUTH_HOS_PATIENT_APPLICATION_SEARCH'),
  duplicateDetection: Symbol('JUTH_HOS_PATIENT_APPLICATION_DUPLICATES'),
  identifierUniqueness: Symbol(
    'JUTH_HOS_PATIENT_APPLICATION_IDENTIFIER_UNIQUENESS',
  ),
  identityResolution: Symbol(
    'JUTH_HOS_PATIENT_APPLICATION_IDENTITY_RESOLUTION',
  ),
  timeline: Symbol('JUTH_HOS_PATIENT_APPLICATION_TIMELINE'),
  restoration: Symbol('JUTH_HOS_PATIENT_APPLICATION_RESTORATION'),
  audit: Symbol('JUTH_HOS_PATIENT_APPLICATION_AUDIT'),
  notifications: Symbol('JUTH_HOS_PATIENT_APPLICATION_NOTIFICATIONS'),
  medicalRecords: Symbol('JUTH_HOS_PATIENT_APPLICATION_MEDICAL_RECORDS'),
  applicationEvents: Symbol('JUTH_HOS_PATIENT_APPLICATION_EVENTS'),
  applicationDependencies: Symbol('JUTH_HOS_PATIENT_APPLICATION_DEPENDENCIES'),
  fhir: Symbol('JUTH_HOS_PATIENT_FHIR_EXTENSION'),
  clinicalModules: Symbol('JUTH_HOS_PATIENT_CLINICAL_MODULES'),
  folderExtensions: Symbol('JUTH_HOS_PATIENT_FOLDER_EXTENSIONS'),
  platformHooks: Symbol('JUTH_HOS_PATIENT_PLATFORM_HOOKS'),
  validationExtensions: Symbol('JUTH_HOS_PATIENT_VALIDATION_EXTENSIONS'),
} as const;
