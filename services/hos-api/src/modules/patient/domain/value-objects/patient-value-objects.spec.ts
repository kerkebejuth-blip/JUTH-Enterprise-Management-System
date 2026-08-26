import { randomUUID } from 'crypto';

import {
  DateOfBirth,
  EmailAddress,
  EnterprisePatientNumber,
  Gender,
  GenderCode,
  HospitalNumber,
  NextOfKin,
  PatientId,
  PatientName,
  PhoneNumber,
  ResidentialAddress,
} from '../index';

describe('Patient value objects', () => {
  it('validates and compares technical identifiers by value', () => {
    const value = randomUUID();

    expect(PatientId.create(value).equals(PatientId.create(value))).toBe(true);
    expect(() => PatientId.create('not-a-uuid')).toThrow('canonical UUID');
  });

  it('preserves human-readable enterprise and hospital identifiers', () => {
    expect(EnterprisePatientNumber.create('JUTH-000001').value).toBe(
      'JUTH-000001',
    );
    expect(HospitalNumber.create('MRN-000001').value).toBe('MRN-000001');
    expect(() => HospitalNumber.create('MRN 000001')).toThrow('non-spaced');
  });

  it('normalizes a patient name for display and matching', () => {
    const name = PatientName.create({
      familyName: '  Gyang ',
      givenNames: ' Amina   Rose ',
    });

    expect(name.displayName).toBe('Gyang Amina Rose');
    expect(name.normalizedForMatching).toBe('GYANG AMINA ROSE');
  });

  it('rejects a future date of birth', () => {
    expect(() =>
      DateOfBirth.create(
        new Date('2026-08-03T00:00:00.000Z'),
        new Date('2026-08-02T00:00:00.000Z'),
      ),
    ).toThrow('future');
  });

  it('validates demographic contact values', () => {
    expect(PhoneNumber.create('+2348012345678').value).toBe('+2348012345678');
    expect(EmailAddress.create('USER@EXAMPLE.ORG').value).toBe(
      'user@example.org',
    );
    expect(() => EmailAddress.create('invalid')).toThrow('valid email');
    expect(Gender.create(GenderCode.Unknown).code).toBe(GenderCode.Unknown);
  });

  it('creates structured addresses and next-of-kin values', () => {
    const address = ResidentialAddress.create({
      line1: '1 Hospital Road',
      locality: 'Jos',
      region: 'Plateau',
      country: 'Nigeria',
    });
    const nextOfKin = NextOfKin.create({
      name: 'Bala Gyang',
      relationship: 'Sibling',
      phoneNumber: PhoneNumber.create('+2348098765432'),
      address,
    });

    expect(nextOfKin.name).toBe('Bala Gyang');
    expect(nextOfKin.phoneNumber?.value).toBe('+2348098765432');
  });
});
