import {
  GenderCode,
  IdentifierStatus,
  MergeRequiresAuthorizationRule,
  PatientIdentifier,
  PatientIdentifierType,
  PatientIdentifierUniquenessRule,
  PatientIdentityImmutableRule,
  Provenance,
  SplitPreservesProvenanceRule,
} from '../index';

describe('Patient business rules', () => {
  it('detects duplicate active identifiers within an authority scope', () => {
    const identifiers = [
      PatientIdentifier.create({
        type: PatientIdentifierType.Facility,
        value: 'A-1',
        assigningAuthority: 'JUTH',
        status: IdentifierStatus.Active,
      }),
      PatientIdentifier.create({
        type: PatientIdentifierType.Facility,
        value: 'A-1',
        assigningAuthority: 'JUTH',
        status: IdentifierStatus.Verified,
      }),
    ];

    expect(new PatientIdentifierUniquenessRule(identifiers).isBroken()).toBe(
      true,
    );
  });

  it('requires explicit merge authorization', () => {
    expect(new MergeRequiresAuthorizationRule(undefined).isBroken()).toBe(true);
    expect(
      new MergeRequiresAuthorizationRule({
        authorizedBy: 'records-1',
        authorizationReference: 'CASE-1',
        reason: 'Confirmed duplicate',
      }).isBroken(),
    ).toBe(false);
  });

  it('requires provenance for split operations', () => {
    expect(new SplitPreservesProvenanceRule(undefined).isBroken()).toBe(true);
    expect(
      new SplitPreservesProvenanceRule(
        Provenance.create({
          source: 'records',
          recordedBy: 'staff-1',
          recordedAt: '2026-08-02T10:00:00.000Z',
          facilityId: 'facility-juth',
          tenantId: 'tenant-juth',
          reason: 'Corrected identity combination',
        }),
      ).isBroken(),
    ).toBe(false);
  });

  it('detects immutable identity changes', () => {
    const rule = new PatientIdentityImmutableRule(
      'patient-1',
      'patient-2',
      'JUTH-1',
      'JUTH-1',
      'MRN-1',
      'MRN-1',
    );

    expect(rule.isBroken()).toBe(true);
    expect(GenderCode.Unknown).toBe('unknown');
  });
});
