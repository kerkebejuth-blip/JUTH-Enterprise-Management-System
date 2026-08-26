import { randomUUID } from 'node:crypto';

import type { Clock, IdentifierGenerator } from '../../../../shared/domain';
import {
  DateOfBirth,
  EnterprisePatientNumber,
  Gender,
  GenderCode,
  HospitalNumber,
  Patient,
  PatientName,
  PatientStatus,
  PhoneNumber,
  Provenance,
} from '../../domain';

class FixtureClock implements Clock {
  private readonly value = new Date('2026-08-02T10:00:00.000Z');

  now(): Date {
    return new Date(this.value);
  }

  nowIso(): string {
    return this.value.toISOString();
  }
}

class FixtureIdentifierGenerator implements IdentifierGenerator<string> {
  generate(): string {
    return randomUUID();
  }
}

/** Creates a deterministic Patient aggregate for infrastructure tests. */
export function createPatientInfrastructureFixture(): Patient {
  const clock = new FixtureClock();
  return Patient.create(
    {
      enterprisePatientNumber: EnterprisePatientNumber.create('JUTH-TEST-001'),
      hospitalNumber: HospitalNumber.create('MRN-TEST-001'),
      name: PatientName.create({
        familyName: 'Gyang',
        givenNames: 'Amina',
        prefix: 'Mrs',
      }),
      dateOfBirth: DateOfBirth.create(
        new Date('1990-05-10T00:00:00.000Z'),
        clock.now(),
      ),
      gender: Gender.create(GenderCode.Female),
      phoneNumber: PhoneNumber.create('+2348012345678'),
      status: PatientStatus.Active,
      provenance: Provenance.create({
        source: 'infrastructure-test',
        recordedBy: 'test-user',
        recordedAt: clock.nowIso(),
        facilityId: 'facility-juth',
        tenantId: 'tenant-juth',
        reason: 'fixture',
      }),
    },
    {
      clock,
      identifierGenerator: new FixtureIdentifierGenerator(),
    },
  );
}
