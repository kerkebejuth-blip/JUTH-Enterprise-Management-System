import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../../database';
import { InfrastructureModule } from '../../../infrastructure';
import { PrismaRepositoryFactory } from '../../../infrastructure/repositories';
import {
  LoggingMedicalRecordsNotificationAdapter,
  LoggingPatientApplicationEventPublisher,
  LoggingPatientAuditAdapter,
  LoggingPatientNotificationAdapter,
} from './adapters/patient-infrastructure.adapters';
import {
  PrismaDuplicateDetectionAdapter,
  PrismaPatientIdentifierUniquenessAdapter,
  PrismaPatientRepository,
  PrismaPatientSearchRepository,
} from './repositories';
import { PatientPersistenceMapper } from './persistence/patient.persistence-mapper';
import { PATIENT_INFRASTRUCTURE_TOKENS } from './patient-infrastructure.tokens';
import type { Repository } from '../../../shared/domain';
import type { Patient } from '../domain';

/** Infrastructure adapter module for Patient identity persistence. */
@Module({
  imports: [DatabaseModule, InfrastructureModule],
  providers: [
    PatientPersistenceMapper,
    PrismaPatientRepository,
    PrismaPatientSearchRepository,
    PrismaDuplicateDetectionAdapter,
    PrismaPatientIdentifierUniquenessAdapter,
    LoggingPatientAuditAdapter,
    LoggingMedicalRecordsNotificationAdapter,
    LoggingPatientNotificationAdapter,
    LoggingPatientApplicationEventPublisher,
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.repository,
      useExisting: PrismaPatientRepository,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.searchRepository,
      useExisting: PrismaPatientSearchRepository,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.duplicateDetection,
      useExisting: PrismaDuplicateDetectionAdapter,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.identifierUniqueness,
      useExisting: PrismaPatientIdentifierUniquenessAdapter,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.audit,
      useExisting: LoggingPatientAuditAdapter,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.medicalRecords,
      useExisting: LoggingMedicalRecordsNotificationAdapter,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.notifications,
      useExisting: LoggingPatientNotificationAdapter,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.applicationEvents,
      useExisting: LoggingPatientApplicationEventPublisher,
    },
    {
      provide: PATIENT_INFRASTRUCTURE_TOKENS.registration,
      inject: [PrismaRepositoryFactory, PrismaPatientRepository],
      useFactory: (
        repositoryFactory: PrismaRepositoryFactory,
        repository: Repository<Patient, string>,
      ): Repository<Patient, string> => {
        repositoryFactory.registerRepository('patient', repository);
        return repository;
      },
    },
  ],
  exports: [
    PatientPersistenceMapper,
    PrismaPatientRepository,
    PrismaPatientSearchRepository,
    PrismaDuplicateDetectionAdapter,
    PrismaPatientIdentifierUniquenessAdapter,
    PATIENT_INFRASTRUCTURE_TOKENS.repository,
    PATIENT_INFRASTRUCTURE_TOKENS.searchRepository,
    PATIENT_INFRASTRUCTURE_TOKENS.duplicateDetection,
    PATIENT_INFRASTRUCTURE_TOKENS.identifierUniqueness,
    PATIENT_INFRASTRUCTURE_TOKENS.audit,
    PATIENT_INFRASTRUCTURE_TOKENS.medicalRecords,
    PATIENT_INFRASTRUCTURE_TOKENS.notifications,
    PATIENT_INFRASTRUCTURE_TOKENS.applicationEvents,
  ],
})
export class PatientInfrastructureModule {}
