import { randomUUID } from 'crypto';

import type { Clock, IdentifierGenerator } from '../../../shared/domain';
import {
  Gender,
  GenderCode,
  HospitalNumber,
  Patient,
  PatientStatus,
  PatientName,
  DateOfBirth,
  EmailAddress,
  EnterprisePatientNumber,
  PhoneNumber,
  PatientId,
  Provenance,
} from './index';

class FixedClock implements Clock {
  private readonly value = new Date('2026-08-02T10:00:00.000Z');

  now(): Date {
    return new Date(this.value);
  }

  nowIso(): string {
    return this.value.toISOString();
  }
}

class UuidIdentifierGenerator implements IdentifierGenerator {
  generate(): string {
    return randomUUID();
  }
}

function createDependencies() {
  return {
    clock: new FixedClock(),
    identifierGenerator: new UuidIdentifierGenerator(),
    eventMetadata: { correlationId: 'correlation-1' },
  };
}

function createProvenance(reason = 'registration') {
  return Provenance.create({
    source: 'registration-desk',
    recordedBy: 'staff-1',
    recordedAt: '2026-08-02T10:00:00.000Z',
    facilityId: 'facility-juth',
    tenantId: 'tenant-juth',
    reason,
  });
}

function createPatient() {
  const dependencies = createDependencies();

  return Patient.create(
    {
      enterprisePatientNumber: EnterprisePatientNumber.create('JUTH-000001'),
      hospitalNumber: HospitalNumber.create('MRN-000001'),
      name: PatientName.create({ familyName: 'Gyang', givenNames: 'Amina' }),
      dateOfBirth: DateOfBirth.create(
        new Date('1990-05-10T00:00:00.000Z'),
        dependencies.clock.now(),
      ),
      gender: Gender.create(GenderCode.Female),
      phoneNumber: PhoneNumber.create('+2348012345678'),
      emailAddress: EmailAddress.create('amina@example.org'),
      status: PatientStatus.Active,
      provenance: createProvenance(),
    },
    dependencies,
  );
}

describe('Patient aggregate', () => {
  it('creates a patient and records PatientRegistered', () => {
    const patient = createPatient();

    expect(patient.status).toBe(PatientStatus.Active);
    expect(patient.enterprisePatientNumber.value).toBe('JUTH-000001');
    expect(patient.hospitalNumber.value).toBe('MRN-000001');
    expect(patient.domainEvents).toHaveLength(1);
    expect(patient.domainEvents[0]?.eventName).toBe('PatientRegistered');
  });

  it('updates demographics through an optimistic version boundary', () => {
    const patient = createPatient();
    const dependencies = createDependencies();
    patient.clearDomainEvents();

    patient.updateDemographics(
      {
        expectedVersion: 1,
        name: PatientName.create({ familyName: 'Gyang', givenNames: 'Amara' }),
        provenance: createProvenance('demographic correction'),
      },
      dependencies,
    );

    expect(patient.name.displayName).toBe('Gyang Amara');
    expect(patient.version).toBe(2);
    expect(patient.domainEvents[0]?.eventName).toBe('PatientUpdated');
  });

  it('rejects a stale demographic update', () => {
    const patient = createPatient();

    expect(() =>
      patient.updateDemographics(
        {
          expectedVersion: 0,
          provenance: createProvenance('stale update'),
        },
        createDependencies(),
      ),
    ).toThrow('Patient version is stale');
  });

  it('archives a patient with an explicit reason and event', () => {
    const patient = createPatient();
    patient.clearDomainEvents();

    patient.archive('approved retention policy', createDependencies());

    expect(patient.status).toBe(PatientStatus.Archived);
    expect(patient.domainEvents[0]?.eventName).toBe('PatientArchived');
  });

  it('requires authorization when merging a source record', () => {
    const patient = createPatient();
    const survivorId = Patient.create(
      {
        enterprisePatientNumber: EnterprisePatientNumber.create('JUTH-000002'),
        hospitalNumber: HospitalNumber.create('MRN-000002'),
        name: PatientName.create({ familyName: 'Gyang', givenNames: 'Bala' }),
        dateOfBirth: DateOfBirth.create(
          new Date('1991-05-10T00:00:00.000Z'),
          createDependencies().clock.now(),
        ),
        gender: Gender.create(GenderCode.Male),
        status: PatientStatus.Active,
        provenance: createProvenance(),
      },
      createDependencies(),
    ).patientId;

    expect(() =>
      patient.mergeInto(
        survivorId,
        undefined,
        createProvenance('merge'),
        createDependencies(),
      ),
    ).toThrow('explicit authorization');
  });

  it('records an authorized merge and marks the source as merged', () => {
    const patient = createPatient();
    const survivorId = PatientId.create(randomUUID());
    patient.clearDomainEvents();

    patient.mergeInto(
      survivorId,
      {
        authorizedBy: 'records-reviewer-1',
        authorizationReference: 'RESOLUTION-001',
        reason: 'Confirmed duplicate record',
      },
      createProvenance('approved merge'),
      createDependencies(),
    );

    expect(patient.status).toBe(PatientStatus.Merged);
    expect(patient.domainEvents[0]?.eventName).toBe('PatientMerged');
  });

  it('records a split only when provenance is supplied', () => {
    const patient = createPatient();
    const resultingPatientId = PatientId.create(randomUUID());
    patient.clearDomainEvents();

    patient.split(
      resultingPatientId,
      createProvenance('approved split'),
      createDependencies(),
    );

    expect(patient.domainEvents[0]?.eventName).toBe('PatientSplit');
    expect(patient.status).toBe(PatientStatus.Active);
  });
});
