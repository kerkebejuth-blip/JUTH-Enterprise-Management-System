import { Prisma } from '@prisma/client';

import { PatientPersistenceMapper } from './patient.persistence-mapper';
import { createPatientInfrastructureFixture } from '../testing/patient-infrastructure.fixture';
import type { Clock } from '../../../../shared/domain';

class MapperClock implements Clock {
  now(): Date {
    return new Date('2026-08-02T10:00:00.000Z');
  }

  nowIso(): string {
    return this.now().toISOString();
  }
}

describe('PatientPersistenceMapper', () => {
  it('maps aggregate identity and demographics to Prisma create data', () => {
    const patient = createPatientInfrastructureFixture();
    const mapper = new PatientPersistenceMapper(new MapperClock());

    const data = mapper.toCreateData(patient);

    expect(data).toMatchObject({
      id: patient.patientId.value,
      enterprisePatientNumber: 'JUTH-TEST-001',
      hospitalNumber: 'MRN-TEST-001',
      familyName: 'Gyang',
      givenNames: 'Amina',
      gender: 'female',
      status: 'active',
      version: 1,
    });
    expect(data.identifiers).toBeDefined();
  });

  it('rehydrates without emitting a registration event', () => {
    const patient = createPatientInfrastructureFixture();
    const mapper = new PatientPersistenceMapper(new MapperClock());
    const createData = mapper.toCreateData(patient);
    const record = {
      ...createData,
      createdAt: new Date('2026-08-02T10:00:00.000Z'),
      updatedAt: new Date('2026-08-02T10:00:00.000Z'),
      identifiers: [],
    } as unknown as Prisma.PatientGetPayload<{
      include: { identifiers: true };
    }>;

    const rehydrated = mapper.fromPersistence(record);

    expect(rehydrated.patientId.value).toBe(patient.patientId.value);
    expect(rehydrated.name.prefix).toBe('Mrs');
    expect(rehydrated.domainEvents).toHaveLength(0);
  });
});
