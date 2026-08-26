import { randomUUID } from 'crypto';

import type { Clock, IdentifierGenerator } from '../../../shared/domain';
import {
  DateOfBirth,
  EnterprisePatientNumber,
  Gender,
  GenderCode,
  HospitalNumber,
  Patient,
  PatientCanBeMergedSpecification,
  PatientHasStatusSpecification,
  PatientIsNotArchivedSpecification,
  PatientName,
  PatientStatus,
  Provenance,
} from '../index';

class SpecificationClock implements Clock {
  now(): Date {
    return new Date('2026-08-02T10:00:00.000Z');
  }

  nowIso(): string {
    return '2026-08-02T10:00:00.000Z';
  }
}

class SpecificationIdentifierGenerator implements IdentifierGenerator {
  generate(): string {
    return randomUUID();
  }
}

function patientWithStatus(status: PatientStatus): Patient {
  const clock = new SpecificationClock();
  const initialStatus =
    status === PatientStatus.Archived ? PatientStatus.Active : status;

  const patient = Patient.create(
    {
      enterprisePatientNumber: EnterprisePatientNumber.create(`JUTH-${status}`),
      hospitalNumber: HospitalNumber.create(`MRN-${status}`),
      name: PatientName.create({ familyName: 'Gyang', givenNames: 'Amina' }),
      dateOfBirth: DateOfBirth.create(
        new Date('1990-01-01T00:00:00.000Z'),
        clock.now(),
      ),
      gender: Gender.create(GenderCode.Female),
      status: initialStatus,
      provenance: Provenance.create({
        source: 'test',
        recordedBy: 'test-user',
        recordedAt: clock.nowIso(),
        facilityId: 'facility-juth',
        tenantId: 'tenant-juth',
        reason: 'test',
      }),
    },
    { clock, identifierGenerator: new SpecificationIdentifierGenerator() },
  );

  if (status === PatientStatus.Archived) {
    patient.archive('specification test', {
      clock,
      identifierGenerator: new SpecificationIdentifierGenerator(),
    });
  }

  return patient;
}

describe('Patient specifications', () => {
  it('matches a requested patient status', () => {
    const patient = patientWithStatus(PatientStatus.Active);

    expect(
      new PatientHasStatusSpecification(PatientStatus.Active).isSatisfiedBy(
        patient,
      ),
    ).toBe(true);
    expect(
      new PatientHasStatusSpecification(PatientStatus.Archived).isSatisfiedBy(
        patient,
      ),
    ).toBe(false);
  });

  it('matches patients eligible for merge', () => {
    expect(
      new PatientCanBeMergedSpecification().isSatisfiedBy(
        patientWithStatus(PatientStatus.Active),
      ),
    ).toBe(true);
    expect(
      new PatientCanBeMergedSpecification().isSatisfiedBy(
        patientWithStatus(PatientStatus.Provisional),
      ),
    ).toBe(false);
  });

  it('matches patients that are not archived', () => {
    expect(
      new PatientIsNotArchivedSpecification().isSatisfiedBy(
        patientWithStatus(PatientStatus.Active),
      ),
    ).toBe(true);
    expect(
      new PatientIsNotArchivedSpecification().isSatisfiedBy(
        patientWithStatus(PatientStatus.Archived),
      ),
    ).toBe(false);
  });
});
