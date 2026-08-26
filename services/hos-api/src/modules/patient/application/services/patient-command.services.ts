import type { ApplicationService } from '../../../../shared/domain';
import {
  Patient,
  PatientId,
  type PatientDomainDependencies,
} from '../../domain';
import type {
  ArchivePatientCommand,
  MergePatientCommand,
  RegisterPatientCommand,
  RestorePatientCommand,
  SplitPatientCommand,
  UpdatePatientCommand,
} from '../commands';
import type { PatientDetailDto } from '../dto';
import {
  DuplicatePatientException,
  PatientNotFoundException,
} from '../exceptions';
import { PatientMapper } from '../mappers';
import type {
  PatientApplicationDependencies,
  PatientRestorationPort,
} from '../ports';
import { DuplicateDetectionService } from './patient-identity.services';
import { PatientApplicationEffects } from './patient-application-effects';
import {
  assertExpectedVersion,
  createPatientDomainDependencies,
  type PatientApplicationMetadataInput,
} from '../utils';

/** Registers a Patient identity after duplicate detection and domain creation. */
export class RegisterPatientService implements ApplicationService<
  RegisterPatientCommand,
  PatientDetailDto
> {
  constructor(
    private readonly dependencies: PatientApplicationDependencies,
    private readonly duplicateDetection: DuplicateDetectionService,
    private readonly effects: PatientApplicationEffects,
  ) {}

  /** Creates and persists one lifelong, clinic-neutral Patient identity. */
  async execute(command: RegisterPatientCommand): Promise<PatientDetailDto> {
    const patient = Patient.create(
      PatientMapper.toCreateInput(command, this.dependencies.clock.now()),
      this.domainDependencies(command),
    );
    const duplicateResult = await this.duplicateDetection.execute(patient);

    if (duplicateResult.isPotentialDuplicate) {
      throw new DuplicatePatientException({
        candidateCount: duplicateResult.candidates.length.toString(),
        candidatePatientIds: duplicateResult.candidates
          .map((candidate) => candidate.patientId)
          .join(','),
      });
    }

    await this.dependencies.unitOfWork.execute(async () => {
      await this.dependencies.repository.save(patient);
      return patient;
    });
    await this.effects.complete(patient, 'registered', command);

    return PatientMapper.toDetail(patient);
  }

  private domainDependencies(
    command: PatientApplicationMetadataInput,
  ): PatientDomainDependencies {
    return createPatientDomainDependencies(
      command,
      this.dependencies.clock,
      this.dependencies.identifierGenerator,
    );
  }
}

/** Updates approved administrative identity data through the Patient aggregate. */
export class UpdatePatientService implements ApplicationService<
  UpdatePatientCommand,
  PatientDetailDto
> {
  constructor(
    private readonly dependencies: PatientApplicationDependencies,
    private readonly effects: PatientApplicationEffects,
  ) {}

  /** Loads, updates, persists, and publishes one Patient identity change. */
  async execute(command: UpdatePatientCommand): Promise<PatientDetailDto> {
    const patient = await this.findPatient(command.patientId);
    const input = PatientMapper.toUpdateInput(
      command,
      command.expectedVersion,
      this.dependencies.clock.now(),
    );

    patient.updateDemographics(input, this.domainDependencies(command));
    await this.saveAndComplete(patient, 'updated', command);

    return PatientMapper.toDetail(patient);
  }

  private async findPatient(patientId: string): Promise<Patient> {
    const patient = await this.dependencies.repository.findById(patientId);
    if (patient === null) {
      throw new PatientNotFoundException(patientId);
    }

    return patient;
  }

  private async saveAndComplete(
    patient: Patient,
    action: 'updated',
    command: UpdatePatientCommand,
  ): Promise<void> {
    await this.dependencies.unitOfWork.execute(async () => {
      await this.dependencies.repository.save(patient);
      return patient;
    });
    await this.effects.complete(patient, action, command);
  }

  private domainDependencies(
    command: PatientApplicationMetadataInput,
  ): PatientDomainDependencies {
    return createPatientDomainDependencies(
      command,
      this.dependencies.clock,
      this.dependencies.identifierGenerator,
    );
  }
}

/** Archives a Patient identity without deleting its legal history. */
export class ArchivePatientService implements ApplicationService<
  ArchivePatientCommand,
  PatientDetailDto
> {
  constructor(
    private readonly dependencies: PatientApplicationDependencies,
    private readonly effects: PatientApplicationEffects,
  ) {}

  /** Applies controlled archive state and publishes continuity signals. */
  async execute(command: ArchivePatientCommand): Promise<PatientDetailDto> {
    const patient = await this.dependencies.repository.findById(
      command.patientId,
    );
    if (patient === null) {
      throw new PatientNotFoundException(command.patientId);
    }

    assertExpectedVersion(patient, command.expectedVersion);
    patient.archive(
      command.reason,
      createPatientDomainDependencies(
        command,
        this.dependencies.clock,
        this.dependencies.identifierGenerator,
      ),
    );
    await this.saveAndComplete(patient, command);

    return PatientMapper.toDetail(patient);
  }

  private async saveAndComplete(
    patient: Patient,
    command: ArchivePatientCommand,
  ): Promise<void> {
    await this.dependencies.unitOfWork.execute(async () => {
      await this.dependencies.repository.save(patient);
      return patient;
    });
    await this.effects.complete(patient, 'archived', command);
  }
}

/** Applies an authorized source-to-survivor Patient identity merge. */
export class MergePatientService implements ApplicationService<
  MergePatientCommand,
  PatientDetailDto
> {
  constructor(
    private readonly dependencies: PatientApplicationDependencies,
    private readonly effects: PatientApplicationEffects,
  ) {}

  /** Verifies both identities, mutates only the source, and preserves events. */
  async execute(command: MergePatientCommand): Promise<PatientDetailDto> {
    const source = await this.dependencies.repository.findById(
      command.sourcePatientId,
    );
    if (source === null) {
      throw new PatientNotFoundException(command.sourcePatientId);
    }

    const survivor = await this.dependencies.repository.findById(
      command.survivorPatientId,
    );
    if (survivor === null) {
      throw new PatientNotFoundException(command.survivorPatientId);
    }

    assertExpectedVersion(source, command.sourceExpectedVersion);
    source.mergeInto(
      PatientId.create(survivor.patientId.value),
      command.authorization,
      PatientMapper.toProvenance(command.provenance),
      createPatientDomainDependencies(
        command,
        this.dependencies.clock,
        this.dependencies.identifierGenerator,
      ),
    );
    await this.dependencies.unitOfWork.execute(async () => {
      await this.dependencies.repository.save(source);
      return source;
    });
    await this.effects.complete(source, 'merged', command);

    return PatientMapper.toDetail(source);
  }
}

/** Records a provenance-preserving split decision through the Patient aggregate. */
export class SplitPatientService implements ApplicationService<
  SplitPatientCommand,
  PatientDetailDto
> {
  constructor(
    private readonly dependencies: PatientApplicationDependencies,
    private readonly effects: PatientApplicationEffects,
  ) {}

  /** Applies the existing domain split operation without creating persistence. */
  async execute(command: SplitPatientCommand): Promise<PatientDetailDto> {
    const patient = await this.dependencies.repository.findById(
      command.patientId,
    );
    if (patient === null) {
      throw new PatientNotFoundException(command.patientId);
    }

    assertExpectedVersion(patient, command.expectedVersion);
    patient.split(
      PatientId.create(command.resultingPatientId),
      PatientMapper.toProvenance(command.provenance),
      createPatientDomainDependencies(
        command,
        this.dependencies.clock,
        this.dependencies.identifierGenerator,
      ),
    );
    await this.dependencies.unitOfWork.execute(async () => {
      await this.dependencies.repository.save(patient);
      return patient;
    });
    await this.effects.complete(patient, 'split', command);

    return PatientMapper.toDetail(patient);
  }
}

/** Restores an archived identity through an approved domain-facing port. */
export class RestorePatientService implements ApplicationService<
  RestorePatientCommand,
  PatientDetailDto
> {
  constructor(
    private readonly dependencies: PatientApplicationDependencies,
    private readonly restorationPort: PatientRestorationPort,
    private readonly effects: PatientApplicationEffects,
  ) {}

  /** Coordinates authorization-aware restoration without owning its rule. */
  async execute(command: RestorePatientCommand): Promise<PatientDetailDto> {
    const patient = await this.dependencies.repository.findById(
      command.patientId,
    );
    if (patient === null) {
      throw new PatientNotFoundException(command.patientId);
    }

    assertExpectedVersion(patient, command.expectedVersion);
    this.restorationPort.restore(
      patient,
      command,
      createPatientDomainDependencies(
        command,
        this.dependencies.clock,
        this.dependencies.identifierGenerator,
      ),
    );
    await this.dependencies.unitOfWork.execute(async () => {
      await this.dependencies.repository.save(patient);
      return patient;
    });
    await this.effects.complete(patient, 'restored', command);

    return PatientMapper.toDetail(patient);
  }
}
