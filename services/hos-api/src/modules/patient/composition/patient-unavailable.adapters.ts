import { Injectable } from '@nestjs/common';

import type {
  IdentityResolutionPort,
  PatientRestorationPort,
  PatientTimelinePort,
} from '../application/ports';
import { PatientApplicationException } from '../application/exceptions';
import type { Patient, PatientDomainDependencies } from '../domain';
import type { RestorePatientCommand } from '../application/commands';
import type { PatientFhirIntegrationPort } from './patient-extension.contracts';

/** Fail-closed timeline port until the Digital Patient Folder projection is composed. */
@Injectable()
export class UnavailablePatientTimelineProvider implements PatientTimelinePort {
  /** Refuses timeline access rather than returning an incomplete patient history. */
  getTimeline(
    patientId: string,
    cursor: string | undefined,
    limit: number,
  ): Promise<never> {
    void patientId;
    void cursor;
    void limit;
    return Promise.reject(
      new PatientApplicationException(
        'Patient timeline provider is not composed.',
        'PATIENT_TIMELINE_PROVIDER_UNAVAILABLE',
      ),
    );
  }
}

/** Fail-closed restoration port until the approved lifecycle policy is composed. */
@Injectable()
export class UnavailablePatientRestorationProvider implements PatientRestorationPort {
  /** Refuses restoration rather than bypassing lifecycle authorization policy. */
  restore(
    patient: Patient,
    command: RestorePatientCommand,
    dependencies: PatientDomainDependencies,
  ): void {
    void patient;
    void command;
    void dependencies;
    throw new PatientApplicationException(
      'Patient restoration provider is not composed.',
      'PATIENT_RESTORATION_PROVIDER_UNAVAILABLE',
    );
  }
}

/** Fail-closed identity-resolution policy extension until its approved policy is bound. */
@Injectable()
export class UnavailablePatientIdentityResolutionProvider implements IdentityResolutionPort {
  /** Refuses identity comparison rather than making an unapproved resolution decision. */
  evaluate(patient: Patient, candidate: Patient): never {
    void patient;
    void candidate;
    throw new PatientApplicationException(
      'Patient identity-resolution policy is not composed.',
      'PATIENT_IDENTITY_RESOLUTION_UNAVAILABLE',
    );
  }
}

/** Fail-closed FHIR extension until the approved profile and adapter are bound. */
@Injectable()
export class UnavailablePatientFhirProvider implements PatientFhirIntegrationPort {
  /** Refuses exchange until an approved interoperability adapter is registered. */
  exportPatientReference(patientId: string): Promise<never> {
    void patientId;
    return Promise.reject(
      new PatientApplicationException(
        'Patient FHIR integration is not composed.',
        'PATIENT_FHIR_PROVIDER_UNAVAILABLE',
      ),
    );
  }
}
