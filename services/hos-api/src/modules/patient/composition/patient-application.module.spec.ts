import { Test } from '@nestjs/testing';

import { AppModule } from '../../../app.module';
import {
  ArchivePatientService,
  DuplicateDetectionService,
  FindPatientService,
  GetPatientTimelineService,
  IdentityResolutionService,
  MergePatientService,
  RegisterPatientService,
  RestorePatientService,
  SearchPatientsService,
  SplitPatientService,
  UpdatePatientService,
} from '../application/services';
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
  PatientApplicationCompositionModule,
  PatientClinicalModuleRegistry,
  PatientFolderExtensionRegistry,
  PatientPlatformHookRegistry,
  PatientValidationExtensionRegistry,
  PATIENT_COMPOSITION_TOKENS,
  UnavailablePatientFhirProvider,
  UnavailablePatientTimelineProvider,
  type PatientFhirIntegrationPort,
} from './index';
import { CompositePatientApplicationEventPublisher } from './patient-application-event.publisher';

describe('Patient application composition', () => {
  it('resolves the application graph through the composed module', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PatientApplicationCompositionModule],
    }).compile();

    const services = [
      RegisterPatientService,
      UpdatePatientService,
      ArchivePatientService,
      MergePatientService,
      SplitPatientService,
      RestorePatientService,
      FindPatientService,
      SearchPatientsService,
      GetPatientTimelineService,
      DuplicateDetectionService,
      IdentityResolutionService,
    ];

    const handlers = [
      RegisterPatientCommandHandler,
      UpdatePatientCommandHandler,
      ArchivePatientCommandHandler,
      MergePatientCommandHandler,
      SplitPatientCommandHandler,
      RestorePatientCommandHandler,
      FindPatientQueryHandler,
      SearchPatientsQueryHandler,
      GetPatientTimelineQueryHandler,
    ];

    for (const provider of services) {
      expect(moduleRef.get(provider)).toBeDefined();
    }

    for (const provider of handlers) {
      expect(moduleRef.get(provider)).toBeDefined();
    }

    expect(
      moduleRef.get(PATIENT_COMPOSITION_TOKENS.applicationDependencies),
    ).toBeDefined();
    expect(
      moduleRef.get(PATIENT_COMPOSITION_TOKENS.applicationEvents),
    ).toBeInstanceOf(CompositePatientApplicationEventPublisher);
    expect(moduleRef.get(PATIENT_COMPOSITION_TOKENS.timeline)).toBeInstanceOf(
      UnavailablePatientTimelineProvider,
    );
    expect(moduleRef.get(PATIENT_COMPOSITION_TOKENS.fhir)).toBeInstanceOf(
      UnavailablePatientFhirProvider,
    );

    await moduleRef.close();
  });

  it('provides empty registries for future governed extensions', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PatientApplicationCompositionModule],
    }).compile();

    const clinicalModules = moduleRef.get(PatientClinicalModuleRegistry);
    const folderExtensions = moduleRef.get(PatientFolderExtensionRegistry);
    const platformHooks = moduleRef.get(PatientPlatformHookRegistry);
    const validationExtensions = moduleRef.get(
      PatientValidationExtensionRegistry,
    );

    expect(clinicalModules.list()).toEqual([]);
    expect(folderExtensions.list()).toEqual([]);
    expect(platformHooks.list()).toEqual([]);
    expect(validationExtensions.list()).toEqual([]);
    expect(moduleRef.get(PATIENT_COMPOSITION_TOKENS.clinicalModules)).toBe(
      clinicalModules,
    );
    expect(moduleRef.get(PATIENT_COMPOSITION_TOKENS.folderExtensions)).toBe(
      folderExtensions,
    );
    expect(moduleRef.get(PATIENT_COMPOSITION_TOKENS.platformHooks)).toBe(
      platformHooks,
    );
    expect(moduleRef.get(PATIENT_COMPOSITION_TOKENS.validationExtensions)).toBe(
      validationExtensions,
    );

    await moduleRef.close();
  });

  it('fails closed when optional integration providers are not composed', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PatientApplicationCompositionModule],
    }).compile();

    const fhir = moduleRef.get<PatientFhirIntegrationPort>(
      PATIENT_COMPOSITION_TOKENS.fhir,
    );

    await expect(
      fhir.exportPatientReference('patient-id'),
    ).rejects.toMatchObject({
      code: 'PATIENT_FHIR_PROVIDER_UNAVAILABLE',
    });

    await moduleRef.close();
  });
});
