import { randomUUID } from 'crypto';

import type {
  Clock,
  DomainEventDispatcher,
  IDomainEvent,
  IdentifierGenerator,
  Specification,
  TransactionContext,
  UnitOfWork,
} from '../../../shared/domain';
import { GenderCode, Patient, PatientStatus } from '../domain';
import type {
  ArchivePatientCommand,
  MergePatientCommand,
  RegisterPatientCommand,
  RestorePatientCommand,
  SplitPatientCommand,
  UpdatePatientCommand,
} from './commands';
import type {
  PatientApplicationDependencies,
  PatientAuditRecord,
  PatientRepository,
  PatientSearchCriteria,
  PatientSearchPort,
  PatientTimelinePort,
} from './ports';
import {
  DuplicatePatientException,
  PatientConcurrencyException,
} from './exceptions';
import { PatientApplicationEffects } from './services/patient-application-effects';
import {
  ArchivePatientService,
  MergePatientService,
  RegisterPatientService,
  RestorePatientService,
  SplitPatientService,
  UpdatePatientService,
} from './services/patient-command.services';
import {
  FindPatientService,
  GetPatientTimelineService,
  SearchPatientsService,
} from './services/patient-query.services';
import { DuplicateDetectionService } from './services/patient-identity.services';
import type { PatientTimelineEntry } from './ports';

class FixedClock implements Clock {
  private readonly value = new Date('2026-08-02T10:00:00.000Z');

  now(): Date {
    return new Date(this.value);
  }

  nowIso(): string {
    return this.value.toISOString();
  }
}

class FixedIdentifierGenerator implements IdentifierGenerator {
  private readonly values = [
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222222',
    '33333333-3333-4333-8333-333333333333',
  ];

  generate(): string {
    return this.values.shift() ?? randomUUID();
  }
}

class InMemoryPatientRepository implements PatientRepository {
  private readonly patients = new Map<string, Patient>();

  findById(id: string): Promise<Patient | null> {
    return Promise.resolve(this.patients.get(id) ?? null);
  }

  findOne(specification: Specification<Patient>): Promise<Patient | null> {
    return Promise.resolve(
      [...this.patients.values()].find((patient) =>
        specification.isSatisfiedBy(patient),
      ) ?? null,
    );
  }

  findMany(specification: Specification<Patient>): Promise<readonly Patient[]> {
    return Promise.resolve(
      [...this.patients.values()].filter((patient) =>
        specification.isSatisfiedBy(patient),
      ),
    );
  }

  paginate(
    specification: Specification<Patient>,
    pageRequest: { readonly page: number; readonly pageSize: number },
  ): Promise<{
    readonly items: Patient[];
    readonly total: number;
    readonly page: number;
    readonly pageSize: number;
  }> {
    const matching = [...this.patients.values()].filter((patient) =>
      specification.isSatisfiedBy(patient),
    );
    const start = (pageRequest.page - 1) * pageRequest.pageSize;
    return Promise.resolve({
      items: matching.slice(start, start + pageRequest.pageSize),
      total: matching.length,
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    });
  }

  save(patient: Patient): Promise<Patient> {
    this.patients.set(patient.patientId.value, patient);
    return Promise.resolve(patient);
  }

  delete(id: string): Promise<void> {
    this.patients.delete(id);
    return Promise.resolve();
  }
}

class InlineUnitOfWork implements UnitOfWork {
  async execute<TResult>(
    operation: (transaction: TransactionContext) => Promise<TResult>,
  ): Promise<TResult> {
    return operation({
      transactionId: 'transaction-1',
      startedAt: new Date('2026-08-02T10:00:00.000Z'),
    });
  }
}

class CapturingDispatcher implements DomainEventDispatcher {
  readonly events: IDomainEvent[] = [];

  dispatch(event: IDomainEvent): Promise<void> {
    this.events.push(event);
    return Promise.resolve();
  }

  dispatchAll(events: readonly IDomainEvent[]): Promise<void> {
    this.events.push(...events);
    return Promise.resolve();
  }
}

class CapturingAudit implements PatientAuditPort {
  readonly records: PatientAuditRecord[] = [];

  record(record: PatientAuditRecord): Promise<void> {
    this.records.push(record);
    return Promise.resolve();
  }
}

class CapturingMedicalRecords {
  readonly notifications: unknown[] = [];

  notifyPatientIdentityChanged(notification: unknown): Promise<void> {
    this.notifications.push(notification);
    return Promise.resolve();
  }
}

class CapturingNotifications {
  readonly notifications: unknown[] = [];

  publish(notification: unknown): Promise<void> {
    this.notifications.push(notification);
    return Promise.resolve();
  }
}

class CapturingApplicationEvents {
  readonly events: unknown[] = [];

  publish(event: unknown): Promise<void> {
    this.events.push(event);
    return Promise.resolve();
  }
}

class ConfigurableDuplicatePort {
  candidates: readonly {
    readonly patientId: string;
    readonly confidenceBand: string;
    readonly evidence: Readonly<Record<string, string>>;
  }[] = [];

  detect(): Promise<
    readonly {
      readonly patientId: string;
      readonly confidenceBand: string;
      readonly evidence: Readonly<Record<string, string>>;
    }[]
  > {
    return Promise.resolve(this.candidates);
  }
}

class InMemorySearchPort implements PatientSearchPort {
  constructor(private readonly repository: InMemoryPatientRepository) {}

  async search(criteria: PatientSearchCriteria): Promise<{
    readonly items: Patient[];
    readonly total: number;
    readonly page: number;
    readonly pageSize: number;
  }> {
    const patient = await this.repository.findOne({
      isSatisfiedBy: (candidate) =>
        candidate.name.displayName
          .toLowerCase()
          .includes(criteria.term.toLowerCase()),
      and: () => this,
      or: () => this,
      not: () => this,
    });

    return {
      items: patient === null ? [] : [patient],
      total: patient === null ? 0 : 1,
      page: criteria.page,
      pageSize: criteria.pageSize,
    };
  }
}

class FixedTimelinePort implements PatientTimelinePort {
  constructor(private readonly entries: readonly PatientTimelineEntry[]) {}

  getTimeline(): Promise<{
    readonly entries: readonly PatientTimelineEntry[];
    readonly nextCursor?: string;
    readonly hasNextPage: boolean;
  }> {
    return Promise.resolve({
      entries: this.entries,
      nextCursor: 'next-1',
      hasNextPage: true,
    });
  }
}

class CapturingRestorePort {
  readonly patientIds: string[] = [];

  restore(patient: Patient): void {
    this.patientIds.push(patient.patientId.value);
  }
}

function createDependencies(repository: InMemoryPatientRepository): {
  readonly dependencies: PatientApplicationDependencies;
  readonly dispatcher: CapturingDispatcher;
  readonly audit: CapturingAudit;
  readonly duplicatePort: ConfigurableDuplicatePort;
} {
  const clock = new FixedClock();
  const identifierGenerator = new FixedIdentifierGenerator();
  const dispatcher = new CapturingDispatcher();
  const audit = new CapturingAudit();
  const medicalRecords = new CapturingMedicalRecords();
  const notifications = new CapturingNotifications();
  const applicationEvents = new CapturingApplicationEvents();

  return {
    dependencies: {
      repository,
      unitOfWork: new InlineUnitOfWork(),
      clock,
      identifierGenerator,
      domainEventDispatcher: dispatcher,
      audit,
      medicalRecords,
      notifications,
      applicationEvents,
    },
    dispatcher,
    audit,
    duplicatePort: new ConfigurableDuplicatePort(),
  };
}

function createRegistrationCommand(): RegisterPatientCommand {
  return {
    enterprisePatientNumber: 'JUTH-000001',
    hospitalNumber: 'MRN-000001',
    name: {
      familyName: 'Gyang',
      givenNames: 'Amina',
    },
    dateOfBirth: '1990-05-10',
    gender: GenderCode.Female,
    phoneNumber: '+2348012345678',
    emailAddress: 'amina@example.org',
    status: PatientStatus.Active,
    provenance: {
      source: 'registration-desk',
      recordedBy: 'staff-1',
      recordedAt: '2026-08-02T10:00:00.000Z',
      facilityId: 'facility-juth',
      tenantId: 'tenant-juth',
      reason: 'new registration',
    },
    correlationId: 'correlation-1',
    userId: 'staff-1',
  };
}

function createEffects(
  dependencies: PatientApplicationDependencies,
): PatientApplicationEffects {
  return new PatientApplicationEffects(
    dependencies.clock,
    dependencies.identifierGenerator,
    dependencies.domainEventDispatcher,
    dependencies.audit,
    dependencies.medicalRecords,
    dependencies.notifications,
    dependencies.applicationEvents,
  );
}

describe('Patient application layer', () => {
  it('registers a patient and publishes continuity side effects', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const service = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );

    const result = await service.execute(createRegistrationCommand());

    expect(result.hospitalNumber).toBe('MRN-000001');
    expect(result.status).toBe(PatientStatus.Active);
    expect(setup.dispatcher.events[0]?.eventName).toBe('PatientRegistered');
    expect(setup.audit.records[0]?.action).toBe('registered');
    await expect(repository.findById(result.patientId)).resolves.not.toBeNull();
  });

  it('blocks registration when duplicate detection returns candidates', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    setup.duplicatePort.candidates = [
      {
        patientId: randomUUID(),
        confidenceBand: 'high',
        evidence: { hospitalNumber: 'exact' },
      },
    ];
    const service = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );

    await expect(
      service.execute(createRegistrationCommand()),
    ).rejects.toBeInstanceOf(DuplicatePatientException);
    await expect(
      repository.findById('11111111-1111-4111-8111-111111111111'),
    ).resolves.toBeNull();
  });

  it('enforces expected version before archive orchestration', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const register = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );
    const registered = await register.execute(createRegistrationCommand());
    const archive: ArchivePatientCommand = {
      patientId: registered.patientId,
      expectedVersion: 0,
      reason: 'approved archive',
      provenance: createRegistrationCommand().provenance,
    };

    await expect(
      new ArchivePatientService(
        setup.dependencies,
        createEffects(setup.dependencies),
      ).execute(archive),
    ).rejects.toBeInstanceOf(PatientConcurrencyException);
  });

  it('updates demographics through the domain aggregate and publishes an event', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const register = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );
    const registered = await register.execute(createRegistrationCommand());
    setup.dispatcher.events.splice(0);

    const command: UpdatePatientCommand = {
      patientId: registered.patientId,
      expectedVersion: 1,
      name: {
        familyName: 'Gyang',
        givenNames: 'Amara',
      },
      provenance: {
        ...createRegistrationCommand().provenance,
        reason: 'approved demographic correction',
      },
    };
    const updated = await new UpdatePatientService(
      setup.dependencies,
      createEffects(setup.dependencies),
    ).execute(command);

    expect(updated.displayName).toBe('Gyang Amara');
    expect(updated.version).toBe(2);
    expect(setup.dispatcher.events[0]?.eventName).toBe('PatientUpdated');
  });

  it('coordinates merge and split operations through existing domain methods', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const register = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );
    const source = await register.execute(createRegistrationCommand());
    const survivor = await register.execute({
      ...createRegistrationCommand(),
      enterprisePatientNumber: 'JUTH-000002',
      hospitalNumber: 'MRN-000002',
      name: { familyName: 'Gyang', givenNames: 'Bala' },
    });
    const merge: MergePatientCommand = {
      sourcePatientId: source.patientId,
      survivorPatientId: survivor.patientId,
      sourceExpectedVersion: 1,
      authorization: {
        authorizedBy: 'records-reviewer-1',
        authorizationReference: 'RESOLUTION-001',
        reason: 'confirmed duplicate record',
      },
      provenance: {
        ...createRegistrationCommand().provenance,
        reason: 'approved merge',
      },
    };
    const merged = await new MergePatientService(
      setup.dependencies,
      createEffects(setup.dependencies),
    ).execute(merge);
    const split: SplitPatientCommand = {
      patientId: survivor.patientId,
      resultingPatientId: randomUUID(),
      expectedVersion: 1,
      provenance: {
        ...createRegistrationCommand().provenance,
        reason: 'approved split',
      },
    };
    await new SplitPatientService(
      setup.dependencies,
      createEffects(setup.dependencies),
    ).execute(split);

    expect(merged.status).toBe(PatientStatus.Merged);
    expect(setup.dispatcher.events.map((event) => event.eventName)).toEqual(
      expect.arrayContaining(['PatientMerged', 'PatientSplit']),
    );
  });

  it('delegates restoration to the approved domain-facing port', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const register = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );
    const registered = await register.execute(createRegistrationCommand());
    const restorationPort = new CapturingRestorePort();
    const command: RestorePatientCommand = {
      patientId: registered.patientId,
      expectedVersion: 1,
      authorization: {
        authorizedBy: 'records-reviewer-1',
        authorizationReference: 'RESTORE-001',
        reason: 'approved restoration',
      },
      provenance: {
        ...createRegistrationCommand().provenance,
        reason: 'approved restoration',
      },
    };

    await new RestorePatientService(
      setup.dependencies,
      restorationPort,
      createEffects(setup.dependencies),
    ).execute(command);

    expect(restorationPort.patientIds).toEqual([registered.patientId]);
  });

  it('maps patient search and timeline results through clinic-neutral query ports', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const register = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );
    const registered = await register.execute(createRegistrationCommand());
    const search = await new SearchPatientsService(
      new InMemorySearchPort(repository),
    ).execute({
      term: 'amina',
      page: 1,
      pageSize: 20,
    });
    const timeline = await new GetPatientTimelineService(
      repository,
      new FixedTimelinePort([
        {
          entryId: 'entry-1',
          category: 'identity',
          occurredAt: '2026-08-02T10:00:00.000Z',
          title: 'Patient registered',
          summary: 'Identity established',
          source: 'patient',
        },
      ]),
    ).execute({
      patientId: registered.patientId,
      limit: 20,
    });

    expect(search.items[0]?.patientId).toBe(registered.patientId);
    expect(timeline.entries[0]?.category).toBe('identity');
    expect(timeline.hasNextPage).toBe(true);
  });

  it('finds a complete patient detail projection', async () => {
    const repository = new InMemoryPatientRepository();
    const setup = createDependencies(repository);
    const register = new RegisterPatientService(
      setup.dependencies,
      new DuplicateDetectionService(setup.duplicatePort),
      createEffects(setup.dependencies),
    );
    const registered = await register.execute(createRegistrationCommand());

    const result = await new FindPatientService(repository).execute({
      patientId: registered.patientId,
    });

    expect(result.displayName).toBe('Gyang Amina');
    expect(result.emailAddress).toBe('amina@example.org');
  });
});
