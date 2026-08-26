import { Module, type FactoryProvider } from '@nestjs/common';

import { INFRASTRUCTURE_TOKENS } from '../../../infrastructure/infrastructure.tokens';
import {
  PATIENT_INFRASTRUCTURE_TOKENS,
  PatientInfrastructureModule,
} from '../infrastructure';
import {
  ArchivePatientCommandHandler,
  FindPatientQueryHandler,
  GetPatientTimelineQueryHandler,
  MergePatientCommandHandler,
  RegisterPatientCommandHandler,
  RestorePatientCommandHandler,
  SearchPatientsQueryHandler,
  SplitPatientCommandHandler,
  UpdatePatientCommandHandler,
} from '../application/handlers';
import {
  ArchivePatientService,
  DuplicateDetectionService,
  FindPatientService,
  GetPatientTimelineService,
  IdentityResolutionService,
  MergePatientService,
  PatientApplicationEffects,
  RegisterPatientService,
  RestorePatientService,
  SearchPatientsService,
  SplitPatientService,
  UpdatePatientService,
} from '../application/services';
import { PatientMapper } from '../application/mappers';
import type {
  PatientApplicationDependencies,
  PatientAuditPort,
  PatientNotificationPort,
  MedicalRecordsNotificationPort,
  PatientRepository,
  PatientSearchPort,
  DuplicateDetectionPort,
  PatientApplicationEventPublisher,
  IdentityResolutionPort,
  PatientTimelinePort,
  PatientRestorationPort,
} from '../application/ports';
import type {
  DomainEventDispatcher,
  IdentifierGenerator,
  Clock,
  UnitOfWork,
} from '../../../shared/domain';
import {
  PatientCanBeMergedSpecification,
  PatientIsNotArchivedSpecification,
} from '../domain';
import {
  PatientClinicalModuleRegistry,
  PatientFolderExtensionRegistry,
  PatientPlatformHookRegistry,
  PatientValidationExtensionRegistry,
} from './patient-extension.contracts';
import { PATIENT_COMPOSITION_TOKENS } from './patient-composition.tokens';
import {
  UnavailablePatientFhirProvider,
  UnavailablePatientIdentityResolutionProvider,
  UnavailablePatientRestorationProvider,
  UnavailablePatientTimelineProvider,
} from './patient-unavailable.adapters';
import { CompositePatientApplicationEventPublisher } from './patient-application-event.publisher';

/** Composes Patient application services, ports, and future extension points. */
@Module({
  imports: [PatientInfrastructureModule],
  providers: [
    PatientMapper,
    PatientClinicalModuleRegistry,
    PatientFolderExtensionRegistry,
    PatientPlatformHookRegistry,
    PatientValidationExtensionRegistry,
    {
      provide: PATIENT_COMPOSITION_TOKENS.clinicalModules,
      useExisting: PatientClinicalModuleRegistry,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.folderExtensions,
      useExisting: PatientFolderExtensionRegistry,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.platformHooks,
      useExisting: PatientPlatformHookRegistry,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.validationExtensions,
      useExisting: PatientValidationExtensionRegistry,
    },
    PatientCanBeMergedSpecification,
    PatientIsNotArchivedSpecification,
    UnavailablePatientTimelineProvider,
    UnavailablePatientRestorationProvider,
    UnavailablePatientIdentityResolutionProvider,
    UnavailablePatientFhirProvider,
    {
      provide: PATIENT_COMPOSITION_TOKENS.patientRepository,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.repository,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.patientSearch,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.searchRepository,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.duplicateDetection,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.duplicateDetection,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.identifierUniqueness,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.identifierUniqueness,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.audit,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.audit,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.notifications,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.notifications,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.medicalRecords,
      useExisting: PATIENT_INFRASTRUCTURE_TOKENS.medicalRecords,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.timeline,
      useExisting: UnavailablePatientTimelineProvider,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.restoration,
      useExisting: UnavailablePatientRestorationProvider,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.identityResolution,
      useExisting: UnavailablePatientIdentityResolutionProvider,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.fhir,
      useExisting: UnavailablePatientFhirProvider,
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.applicationEvents,
      inject: [PATIENT_INFRASTRUCTURE_TOKENS.applicationEvents],
      useFactory: (
        publisher: PatientApplicationEventPublisher,
      ): CompositePatientApplicationEventPublisher =>
        new CompositePatientApplicationEventPublisher([publisher]),
    },
    {
      provide: PATIENT_COMPOSITION_TOKENS.applicationDependencies,
      inject: [
        PATIENT_COMPOSITION_TOKENS.patientRepository,
        INFRASTRUCTURE_TOKENS.unitOfWork,
        INFRASTRUCTURE_TOKENS.clock,
        INFRASTRUCTURE_TOKENS.identifierGenerator,
        INFRASTRUCTURE_TOKENS.domainEventDispatcher,
        PATIENT_COMPOSITION_TOKENS.audit,
        PATIENT_COMPOSITION_TOKENS.medicalRecords,
        PATIENT_COMPOSITION_TOKENS.notifications,
        PATIENT_COMPOSITION_TOKENS.applicationEvents,
      ],
      useFactory: (
        repository: PatientRepository,
        unitOfWork: UnitOfWork,
        clock: Clock,
        identifierGenerator: IdentifierGenerator<string>,
        domainEventDispatcher: DomainEventDispatcher,
        audit: PatientAuditPort,
        medicalRecords: MedicalRecordsNotificationPort,
        notifications: PatientNotificationPort,
        applicationEvents: PatientApplicationEventPublisher,
      ): PatientApplicationDependencies => ({
        repository,
        unitOfWork,
        clock,
        identifierGenerator,
        domainEventDispatcher,
        audit,
        medicalRecords,
        notifications,
        applicationEvents,
      }),
    },
    {
      provide: PatientApplicationEffects,
      inject: [
        INFRASTRUCTURE_TOKENS.clock,
        INFRASTRUCTURE_TOKENS.identifierGenerator,
        INFRASTRUCTURE_TOKENS.domainEventDispatcher,
        PATIENT_COMPOSITION_TOKENS.audit,
        PATIENT_COMPOSITION_TOKENS.medicalRecords,
        PATIENT_COMPOSITION_TOKENS.notifications,
        PATIENT_COMPOSITION_TOKENS.applicationEvents,
      ],
      useFactory: (
        clock: Clock,
        identifierGenerator: IdentifierGenerator<string>,
        domainEventDispatcher: DomainEventDispatcher,
        audit: PatientAuditPort,
        medicalRecords: MedicalRecordsNotificationPort,
        notifications: PatientNotificationPort,
        applicationEvents: PatientApplicationEventPublisher,
      ): PatientApplicationEffects =>
        new PatientApplicationEffects(
          clock,
          identifierGenerator,
          domainEventDispatcher,
          audit,
          medicalRecords,
          notifications,
          applicationEvents,
        ),
    },
    {
      provide: DuplicateDetectionService,
      inject: [PATIENT_COMPOSITION_TOKENS.duplicateDetection],
      useFactory: (port: DuplicateDetectionPort) =>
        new DuplicateDetectionService(port),
    },
    {
      provide: IdentityResolutionService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.patientRepository,
        PATIENT_COMPOSITION_TOKENS.identityResolution,
      ],
      useFactory: (
        repository: PatientRepository,
        port: IdentityResolutionPort,
      ) => new IdentityResolutionService(repository, port),
    },
    {
      provide: RegisterPatientService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.applicationDependencies,
        DuplicateDetectionService,
        PatientApplicationEffects,
      ],
      useFactory: (
        dependencies: PatientApplicationDependencies,
        duplicateDetection: DuplicateDetectionService,
        effects: PatientApplicationEffects,
      ) =>
        new RegisterPatientService(dependencies, duplicateDetection, effects),
    },
    ...commandServiceProviders(),
    {
      provide: FindPatientService,
      inject: [PATIENT_COMPOSITION_TOKENS.patientRepository],
      useFactory: (repository: PatientRepository) =>
        new FindPatientService(repository),
    },
    {
      provide: SearchPatientsService,
      inject: [PATIENT_COMPOSITION_TOKENS.patientSearch],
      useFactory: (search: PatientSearchPort) =>
        new SearchPatientsService(search),
    },
    {
      provide: GetPatientTimelineService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.patientRepository,
        PATIENT_COMPOSITION_TOKENS.timeline,
      ],
      useFactory: (
        repository: PatientRepository,
        timeline: PatientTimelinePort,
      ) => new GetPatientTimelineService(repository, timeline),
    },
    {
      provide: RegisterPatientCommandHandler,
      inject: [RegisterPatientService],
      useFactory: (service: RegisterPatientService) =>
        new RegisterPatientCommandHandler(service),
    },
    ...commandHandlerProviders(),
    {
      provide: FindPatientQueryHandler,
      inject: [FindPatientService],
      useFactory: (service: FindPatientService) =>
        new FindPatientQueryHandler(service),
    },
    {
      provide: SearchPatientsQueryHandler,
      inject: [SearchPatientsService],
      useFactory: (service: SearchPatientsService) =>
        new SearchPatientsQueryHandler(service),
    },
    {
      provide: GetPatientTimelineQueryHandler,
      inject: [GetPatientTimelineService],
      useFactory: (service: GetPatientTimelineService) =>
        new GetPatientTimelineQueryHandler(service),
    },
  ],
  exports: [
    PatientMapper,
    PatientClinicalModuleRegistry,
    PatientFolderExtensionRegistry,
    PatientPlatformHookRegistry,
    PatientValidationExtensionRegistry,
    PATIENT_COMPOSITION_TOKENS.clinicalModules,
    PATIENT_COMPOSITION_TOKENS.folderExtensions,
    PATIENT_COMPOSITION_TOKENS.platformHooks,
    PATIENT_COMPOSITION_TOKENS.validationExtensions,
    PATIENT_COMPOSITION_TOKENS.patientRepository,
    PATIENT_COMPOSITION_TOKENS.patientSearch,
    PATIENT_COMPOSITION_TOKENS.duplicateDetection,
    PATIENT_COMPOSITION_TOKENS.identifierUniqueness,
    PATIENT_COMPOSITION_TOKENS.timeline,
    PATIENT_COMPOSITION_TOKENS.restoration,
    PATIENT_COMPOSITION_TOKENS.audit,
    PATIENT_COMPOSITION_TOKENS.notifications,
    PATIENT_COMPOSITION_TOKENS.medicalRecords,
    PATIENT_COMPOSITION_TOKENS.applicationEvents,
    PATIENT_COMPOSITION_TOKENS.applicationDependencies,
    PATIENT_COMPOSITION_TOKENS.fhir,
    DuplicateDetectionService,
    IdentityResolutionService,
    RegisterPatientService,
    UpdatePatientService,
    ArchivePatientService,
    MergePatientService,
    SplitPatientService,
    RestorePatientService,
    FindPatientService,
    SearchPatientsService,
    GetPatientTimelineService,
    RegisterPatientCommandHandler,
    UpdatePatientCommandHandler,
    ArchivePatientCommandHandler,
    MergePatientCommandHandler,
    SplitPatientCommandHandler,
    RestorePatientCommandHandler,
    FindPatientQueryHandler,
    SearchPatientsQueryHandler,
    GetPatientTimelineQueryHandler,
  ],
})
export class PatientApplicationCompositionModule {}

function commandServiceProviders(): FactoryProvider[] {
  return [
    {
      provide: UpdatePatientService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.applicationDependencies,
        PatientApplicationEffects,
      ],
      useFactory: (
        dependencies: PatientApplicationDependencies,
        effects: PatientApplicationEffects,
      ) => new UpdatePatientService(dependencies, effects),
    },
    {
      provide: ArchivePatientService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.applicationDependencies,
        PatientApplicationEffects,
      ],
      useFactory: (
        dependencies: PatientApplicationDependencies,
        effects: PatientApplicationEffects,
      ) => new ArchivePatientService(dependencies, effects),
    },
    {
      provide: MergePatientService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.applicationDependencies,
        PatientApplicationEffects,
      ],
      useFactory: (
        dependencies: PatientApplicationDependencies,
        effects: PatientApplicationEffects,
      ) => new MergePatientService(dependencies, effects),
    },
    {
      provide: SplitPatientService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.applicationDependencies,
        PatientApplicationEffects,
      ],
      useFactory: (
        dependencies: PatientApplicationDependencies,
        effects: PatientApplicationEffects,
      ) => new SplitPatientService(dependencies, effects),
    },
    {
      provide: RestorePatientService,
      inject: [
        PATIENT_COMPOSITION_TOKENS.applicationDependencies,
        PATIENT_COMPOSITION_TOKENS.restoration,
        PatientApplicationEffects,
      ],
      useFactory: (
        dependencies: PatientApplicationDependencies,
        restoration: PatientRestorationPort,
        effects: PatientApplicationEffects,
      ) => new RestorePatientService(dependencies, restoration, effects),
    },
  ];
}

function commandHandlerProviders(): FactoryProvider[] {
  return [
    {
      provide: UpdatePatientCommandHandler,
      inject: [UpdatePatientService],
      useFactory: (service: UpdatePatientService) =>
        new UpdatePatientCommandHandler(service),
    },
    {
      provide: ArchivePatientCommandHandler,
      inject: [ArchivePatientService],
      useFactory: (service: ArchivePatientService) =>
        new ArchivePatientCommandHandler(service),
    },
    {
      provide: MergePatientCommandHandler,
      inject: [MergePatientService],
      useFactory: (service: MergePatientService) =>
        new MergePatientCommandHandler(service),
    },
    {
      provide: SplitPatientCommandHandler,
      inject: [SplitPatientService],
      useFactory: (service: SplitPatientService) =>
        new SplitPatientCommandHandler(service),
    },
    {
      provide: RestorePatientCommandHandler,
      inject: [RestorePatientService],
      useFactory: (service: RestorePatientService) =>
        new RestorePatientCommandHandler(service),
    },
  ];
}
