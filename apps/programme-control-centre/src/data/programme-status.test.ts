import { describe, expect, it } from 'vitest';

import {
  CAPABILITY_STATUSES,
  CRITERION_KEYS,
  DISCOVERY_STATUSES,
  EVIDENCE_STATUSES,
  capabilities,
  countCriteria,
  filterCapabilities,
  filterWorkflowDiscovery,
  safeEvidence,
  workflowDiscovery,
} from './programme-status';

describe('programme status model', () => {
  it('uses explicit status vocabularies', () => {
    expect(CAPABILITY_STATUSES).toContain('NOT_ASSESSED');
    expect(EVIDENCE_STATUSES).toContain('NOT_ASSESSED');
    expect(DISCOVERY_STATUSES).toContain('CLINICALLY_VALIDATED');
  });

  it('gives every capability the complete evidence criteria set', () => {
    for (const capability of capabilities) {
      expect(Object.keys(capability.criteria)).toHaveLength(CRITERION_KEYS.length);
      expect(capability.criteria.DOMAIN.status).toBeDefined();
    }
  });

  it('represents evidence without arbitrary percentages', () => {
    const patient = capabilities.find((item) => item.id === 'patient-mpi');
    expect(patient).toBeDefined();
    if (!patient) return;
    const counts = countCriteria(patient.criteria);
    expect(counts.VERIFIED + counts.PARTIAL + counts.MISSING + counts.NOT_ASSESSED).toBe(
      CRITERION_KEYS.length,
    );
  });

  it('starts workflow discovery conservatively', () => {
    expect(workflowDiscovery).toHaveLength(26);
    expect(workflowDiscovery.every((item) => item.status === 'NOT_STARTED')).toBe(true);
  });

  it('filters capabilities by evidence catalogue fields', () => {
    const filtered = filterCapabilities(capabilities, {
      area: 'Clinical',
      search: 'patient / mpi',
      status: 'PARTIAL',
    });
    expect(filtered.map((record) => record.id)).toEqual(['patient-mpi']);
    expect(
      filterCapabilities(capabilities, { status: 'MISSING' }).every(
        (record) => record.status === 'MISSING',
      ),
    ).toBe(true);
  });

  it('filters workflow discovery without changing its independent status', () => {
    const diagnostic = filterWorkflowDiscovery(workflowDiscovery, {
      serviceType: 'Diagnostic',
      status: 'NOT_STARTED',
    });
    expect(diagnostic.map((record) => record.department)).toEqual([
      'Laboratory',
      'Blood Bank',
      'Radiology',
    ]);
  });

  it('provides a safe rendering value for missing evidence', () => {
    expect(safeEvidence([])).toEqual(['No evidence recorded.']);
    expect(safeEvidence(['checkpoint.md'])).toEqual(['checkpoint.md']);
  });
});
