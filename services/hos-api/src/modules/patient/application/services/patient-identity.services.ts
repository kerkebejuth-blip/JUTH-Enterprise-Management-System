import type {
  ApplicationService,
  BusinessRule,
} from '../../../../shared/domain';
import type { Patient } from '../../domain';
import type { DuplicateCandidate } from '../../domain';
import type {
  DuplicateDetectionPort,
  IdentityResolutionPort,
  PatientRepository,
} from '../ports';
import { PatientNotFoundException } from '../exceptions';

/** Result returned by duplicate detection before registration continues. */
export interface DuplicateDetectionResult {
  readonly isPotentialDuplicate: boolean;
  readonly candidates: readonly DuplicateCandidate[];
}

/** Application service that coordinates explainable duplicate detection. */
export class DuplicateDetectionService implements ApplicationService<
  Patient,
  DuplicateDetectionResult
> {
  constructor(private readonly port: DuplicateDetectionPort) {}

  /** Evaluates a candidate identity without persisting or changing it. */
  async execute(patient: Patient): Promise<DuplicateDetectionResult> {
    const candidates = await this.port.detect(patient);
    return {
      isPotentialDuplicate: candidates.length > 0,
      candidates,
    };
  }
}

/** Candidate pair used by the identity-resolution application service. */
export interface IdentityResolutionRequest {
  readonly patientId: string;
  readonly candidatePatientId: string;
}

/** Explainable identity-resolution result for human-authorized review. */
export interface IdentityResolutionResult {
  readonly patientId: string;
  readonly candidatePatientId: string;
  readonly isEquivalent: boolean;
  readonly brokenRules: readonly string[];
}

/** Application service that coordinates domain identity-policy evaluation. */
export class IdentityResolutionService implements ApplicationService<
  IdentityResolutionRequest,
  IdentityResolutionResult
> {
  constructor(
    private readonly repository: PatientRepository,
    private readonly port: IdentityResolutionPort,
  ) {}

  /** Evaluates two existing identities without applying a merge decision. */
  async execute(
    request: IdentityResolutionRequest,
  ): Promise<IdentityResolutionResult> {
    const patient = await this.repository.findById(request.patientId);
    if (patient === null) {
      throw new PatientNotFoundException(request.patientId);
    }

    const candidate = await this.repository.findById(
      request.candidatePatientId,
    );
    if (candidate === null) {
      throw new PatientNotFoundException(request.candidatePatientId);
    }

    const rules: readonly BusinessRule[] = this.port.evaluate(
      patient,
      candidate,
    );

    return {
      patientId: request.patientId,
      candidatePatientId: request.candidatePatientId,
      isEquivalent: rules.every((rule) => !rule.isBroken()),
      brokenRules: rules
        .filter((rule) => rule.isBroken())
        .map((rule) => rule.message),
    };
  }
}
