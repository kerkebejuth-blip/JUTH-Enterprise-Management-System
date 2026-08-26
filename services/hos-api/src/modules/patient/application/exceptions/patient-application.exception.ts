/** Base framework-independent exception for Patient application failures. */
export class PatientApplicationException extends Error {
  /** Creates a typed application failure without HTTP or framework coupling. */
  constructor(
    message: string,
    public readonly code: string,
    public readonly details: Readonly<Record<string, string>> = {},
  ) {
    super(message);
    this.name = 'PatientApplicationException';
  }
}

/** Raised when a requested Patient identity is not available. */
export class PatientNotFoundException extends PatientApplicationException {
  /** Creates a not-found application failure. */
  constructor(patientId: string) {
    super('Patient was not found: ' + patientId + '.', 'PATIENT_NOT_FOUND', {
      patientId,
    });
    this.name = 'PatientNotFoundException';
  }
}

/** Raised when identity matching finds a candidate requiring review. */
export class DuplicatePatientException extends PatientApplicationException {
  /** Creates a duplicate identity failure with explainable evidence. */
  constructor(details: Readonly<Record<string, string>>) {
    super(
      'A possible duplicate patient identity requires resolution before registration.',
      'PATIENT_DUPLICATE_CANDIDATE',
      details,
    );
    this.name = 'DuplicatePatientException';
  }
}

/** Raised when a command was based on a stale aggregate version. */
export class PatientConcurrencyException extends PatientApplicationException {
  /** Creates a stale-version application failure. */
  constructor(
    patientId: string,
    expectedVersion: number,
    actualVersion: number,
  ) {
    super(
      'Patient changed after the command was prepared and must be reloaded.',
      'PATIENT_CONCURRENCY_CONFLICT',
      {
        patientId,
        expectedVersion: expectedVersion.toString(),
        actualVersion: actualVersion.toString(),
      },
    );
    this.name = 'PatientConcurrencyException';
  }
}
