export const CAPABILITY_STATUSES = [
  'COMPLETE',
  'PARTIAL',
  'PLACEHOLDER',
  'MISSING',
  'BROKEN',
  'NOT_ASSESSED',
] as const;
export type CapabilityStatus = (typeof CAPABILITY_STATUSES)[number];

export const EVIDENCE_STATUSES = [
  'VERIFIED',
  'PARTIAL',
  'MISSING',
  'NOT_APPLICABLE',
  'NOT_ASSESSED',
  'BROKEN',
] as const;
export type EvidenceStatus = (typeof EVIDENCE_STATUSES)[number];

export const CRITERION_KEYS = [
  'DOMAIN',
  'DATABASE',
  'API',
  'AUTHORIZATION',
  'AUDIT',
  'UI',
  'VALIDATION',
  'ERROR_HANDLING',
  'TESTS',
  'WORKFLOW_VALIDATION',
  'OPERATIONAL_READINESS',
] as const;
export type CriterionKey = (typeof CRITERION_KEYS)[number];
export type CapabilityCriteria = Record<CriterionKey, { status: EvidenceStatus; evidence: string }>;

export interface CapabilityRecord {
  id: string;
  name: string;
  area: 'Enterprise / Platform' | 'Clinical' | 'Enterprise Operations';
  status: CapabilityStatus;
  summary: string;
  evidence: string[];
  gaps: string[];
  dependencies: string[];
  adrs: string[];
  tests: string[];
  criteria: CapabilityCriteria;
}

export interface CapabilityFilters {
  search?: string;
  status?: CapabilityStatus | 'ALL';
  area?: CapabilityRecord['area'] | 'ALL';
}

export const DISCOVERY_STATUSES = [
  'NOT_STARTED',
  'INTERVIEW_SCHEDULED',
  'DISCOVERY_IN_PROGRESS',
  'CURRENT_WORKFLOW_CAPTURED',
  'PAIN_POINTS_VALIDATED',
  'FUTURE_WORKFLOW_DESIGNED',
  'CLINICALLY_VALIDATED',
  'SPECIFICATION_READY',
  'DEVELOPMENT',
  'UAT',
  'READY_FOR_DEPLOYMENT',
] as const;
export type DiscoveryStatus = (typeof DISCOVERY_STATUSES)[number];

export interface WorkflowDiscoveryRecord {
  id: string;
  department: string;
  serviceType: 'Clinical' | 'Diagnostic' | 'Administrative' | 'Support';
  status: DiscoveryStatus;
  evidence: string;
  owner: string;
}

export interface WorkflowDiscoveryFilters {
  status?: DiscoveryStatus | 'ALL';
  serviceType?: WorkflowDiscoveryRecord['serviceType'] | 'ALL';
}

export interface RiskRecord {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  evidence: string;
  decision: string;
}

export const programmeStatus = {
  currentSprint: 'Architecture Realignment / Programme Visibility Foundation',
  currentSlice: 'Development-only Programme Control Centre',
  latestCheckpoint: 'Architecture Realignment Checkpoint',
  checkpointPath: 'docs/30_Enterprise_Audit/17_Architecture_Realignment_Checkpoint.md',
  repositoryStatus: 'CLEAN_BEFORE_CONTROL_CENTRE_SLICE',
  buildStatus: 'NOT_ASSESSED',
  testStatus: 'NOT_ASSESSED',
  architectureFitnessStatus: 'MISSING',
  databaseStatus: 'NOT_CONFIGURED_FOR_CONTROL_CENTRE',
  securityStatus: 'PARTIAL_FAIL_CLOSED_FOUNDATION',
  adrStatus: 'BASELINE_COMPLETE_NEW_DECISIONS_PENDING',
  blockers: [
    'Provider-backed authentication is unavailable.',
    'Durable tamper-evident audit storage is not implemented.',
    'Encounter, clinical record, and clinical coordination contexts are not implemented.',
    'Root Turbo and lint/e2e execution require a clean process-environment rerun.',
  ],
  recommendedNextSlice:
    'Approve the P0 authentication/authorization and durable audit boundary before clinical implementation.',
} as const;

function makeCriteria(
  overrides: Partial<Record<CriterionKey, EvidenceStatus>>,
): CapabilityCriteria {
  const result = {} as CapabilityCriteria;
  for (const key of CRITERION_KEYS) {
    result[key] = {
      status: overrides[key] ?? 'NOT_ASSESSED',
      evidence: overrides[key]
        ? 'Evidence recorded in the architecture checkpoint.'
        : 'No repository evidence recorded for this criterion.',
    };
  }
  return result;
}

const platformCriteria = makeCriteria({
  DOMAIN: 'PARTIAL',
  API: 'PARTIAL',
  AUTHORIZATION: 'PARTIAL',
  AUDIT: 'PARTIAL',
  VALIDATION: 'VERIFIED',
  ERROR_HANDLING: 'VERIFIED',
  TESTS: 'PARTIAL',
  OPERATIONAL_READINESS: 'PARTIAL',
});
const missingCriteria = makeCriteria({
  DOMAIN: 'MISSING',
  DATABASE: 'MISSING',
  API: 'MISSING',
  UI: 'MISSING',
  TESTS: 'MISSING',
  WORKFLOW_VALIDATION: 'NOT_ASSESSED',
  OPERATIONAL_READINESS: 'MISSING',
});
const patientCriteria = makeCriteria({
  DOMAIN: 'VERIFIED',
  DATABASE: 'PARTIAL',
  API: 'PARTIAL',
  AUTHORIZATION: 'PARTIAL',
  AUDIT: 'PARTIAL',
  UI: 'PARTIAL',
  VALIDATION: 'VERIFIED',
  ERROR_HANDLING: 'VERIFIED',
  TESTS: 'PARTIAL',
  WORKFLOW_VALIDATION: 'NOT_ASSESSED',
  OPERATIONAL_READINESS: 'PARTIAL',
});

function record(
  id: string,
  name: string,
  area: CapabilityRecord['area'],
  status: CapabilityStatus,
  summary: string,
  criteria: CapabilityCriteria,
  evidence: string[],
  gaps: string[],
): CapabilityRecord {
  return {
    id,
    name,
    area,
    status,
    summary,
    criteria,
    evidence,
    gaps,
    dependencies: ['Enterprise Core', 'Identity and Access', 'Audit'],
    adrs: [
      'ADR-005 Clean Architecture',
      'ADR-006 Domain-Driven Design',
      'ADR-007 Modular Monolith Strategy',
    ],
    tests: [],
  };
}

const platformRecords = [
  record(
    'enterprise-core',
    'Enterprise Core',
    'Enterprise / Platform',
    'PARTIAL',
    'Shared runtime foundations exist; canonical enterprise registries are incomplete.',
    platformCriteria,
    ['services/hos-api/src/core', 'services/hos-api/src/config', 'services/hos-api/src/health'],
    ['Staff, facility, department, encounter, terminology, and notification services.'],
  ),
  record(
    'iam',
    'IAM / Identity',
    'Enterprise / Platform',
    'PLACEHOLDER',
    'Contracts and fail-closed authorization exist without provider-backed identity.',
    platformCriteria,
    ['services/hos-api/src/modules/identity', 'services/hos-api/src/security'],
    ['Authentication provider, sessions, token validation, MFA, and policy evaluation.'],
  ),
  record(
    'audit',
    'Audit',
    'Enterprise / Platform',
    'PARTIAL',
    'Audit events are published to logging; durable legal audit storage is absent.',
    platformCriteria,
    ['services/hos-api/src/audit', 'services/hos-api/src/logging'],
    ['Tamper evidence, retention, immutable persistence, and operational review.'],
  ),
  record(
    'configuration',
    'Configuration',
    'Enterprise / Platform',
    'PARTIAL',
    'Typed environment configuration exists; production secret lifecycle remains open.',
    platformCriteria,
    ['services/hos-api/src/config'],
    ['Production secret management and environment policy enforcement.'],
  ),
  record(
    'observability',
    'Observability',
    'Enterprise / Platform',
    'PARTIAL',
    'Logging, timing, health, and correlation exist without metrics or tracing backends.',
    platformCriteria,
    [
      'services/hos-api/src/logging',
      'services/hos-api/src/interceptors',
      'services/hos-api/src/health',
    ],
    ['Metrics, traces, dashboards, alerts, and runbooks.'],
  ),
  record(
    'documents',
    'Documents',
    'Enterprise / Platform',
    'MISSING',
    'Document governance is documented but no runtime document lifecycle exists.',
    missingCriteria,
    [
      'docs/27_Enterprise_Clinical_Framework',
      'docs/26_JUTH_Knowledge_Base/07_The_Digital_Patient_Folder.md',
    ],
    ['Draft, signed, amended, superseded, provenance, and retention workflows.'],
  ),
  record(
    'terminology',
    'Terminology',
    'Enterprise / Platform',
    'MISSING',
    'Terminology governance is a target requirement without a runtime service.',
    missingCriteria,
    ['docs/20_Integrations'],
    ['Local code sets, mappings, versioning, and clinical governance.'],
  ),
  record(
    'interoperability',
    'Interoperability',
    'Enterprise / Platform',
    'PLACEHOLDER',
    'Standards readiness is documented; no gateway or adapter runtime exists.',
    platformCriteria,
    [
      'docs/20_Integrations',
      'docs/27_Enterprise_Clinical_Framework/10_Enterprise_Clinical_Integration.md',
    ],
    ['Versioned contracts, anti-corruption layers, and message delivery.'],
  ),
];

const clinicalNames = [
  'Encounter',
  'Clinical Record',
  'Orders',
  'Medication',
  'Nursing',
  'Laboratory',
  'Radiology',
  'Clinical Coordination',
  'Referral',
  'A&E',
  'Inpatient / Wards',
  'Theatre',
  'ICU/HDU',
  'Blood Bank',
  'Maternity',
  'Paediatrics / Neonatal',
  'Eye Clinic',
  'Other Specialty Clinics',
  'Amenity',
  'Vital Events / Last Office',
];
const clinicalRecords = clinicalNames.map((name) =>
  record(
    name.toLowerCase().replaceAll(' ', '-').replaceAll('/', ''),
    name,
    'Clinical',
    'MISSING',
    'No runtime bounded context is implemented; this catalogue entry preserves the approved target state.',
    missingCriteria,
    ['docs/29_Capability_Model/MASTER_CAPABILITY_MATRIX.md'],
    [
      'Approved blueprint, domain/application/infrastructure layers, API, authorization, audit, UI, tests, and operational readiness.',
    ],
  ),
);
const operationNames = [
  'Scheduling',
  'Billing',
  'NHIA/HMO',
  'Patient Flow',
  'Command Centre',
  'Management Analytics',
  'Quality / Patient Safety',
  'Infection Prevention',
  'Teaching',
  'Research',
  'AI / Future Intelligence',
];
const operationRecords = operationNames.map((name) =>
  record(
    name.toLowerCase().replaceAll(' ', '-').replaceAll('/', ''),
    name,
    'Enterprise Operations',
    'MISSING',
    'No runtime capability is implemented; this is a target-state planning record only.',
    missingCriteria,
    ['docs/29_Capability_Model/MASTER_CAPABILITY_MATRIX.md'],
    ['Approved bounded-context blueprint and complete delivery evidence.'],
  ),
);

export const capabilities: CapabilityRecord[] = [
  ...platformRecords,
  record(
    'patient-mpi',
    'Patient / MPI',
    'Clinical',
    'PARTIAL',
    'Patient identity, administrative demographics, persistence, composition, and protected read APIs exist.',
    patientCriteria,
    [
      'services/hos-api/src/modules/patient',
      'docs/02_Domain_Blueprints/Patient_Domain_Blueprint.md',
    ],
    [
      'Encounter, longitudinal record, institutional matching operations, durable audit, and authenticated production use.',
    ],
  ),
  ...clinicalRecords,
  ...operationRecords,
];

const departmentNames = [
  'A&E',
  'General OPD',
  'Eye Clinic',
  'Medical Wards',
  'Surgical Wards',
  'Paediatric Wards',
  'Maternity',
  'Labour Ward',
  'Neonatal',
  'ICU',
  'HDU',
  'Theatre',
  'Anaesthesia',
  'Laboratory',
  'Blood Bank',
  'Radiology',
  'Pharmacy',
  'Medical Records',
  'Registration',
  'Last Office / Vital Events',
  'Amenity',
  'NHIA/HMO',
  'Accounts/Billing',
  'Physiotherapy',
  'Dental',
  'ENT',
];
export const workflowDiscovery: WorkflowDiscoveryRecord[] = departmentNames.map(
  (department, index) => ({
    id: `workflow-${index + 1}`,
    department,
    serviceType: ['Laboratory', 'Blood Bank', 'Radiology'].includes(department)
      ? 'Diagnostic'
      : [
            'Medical Records',
            'Registration',
            'Last Office / Vital Events',
            'NHIA/HMO',
            'Accounts/Billing',
          ].includes(department)
        ? 'Administrative'
        : department === 'Amenity'
          ? 'Support'
          : 'Clinical',
    status: 'NOT_STARTED',
    evidence: 'No approved workflow discovery evidence recorded in the repository.',
    owner: 'Unassigned',
  }),
);

export function filterCapabilities(
  records: CapabilityRecord[],
  filters: CapabilityFilters,
): CapabilityRecord[] {
  const search = filters.search?.trim().toLowerCase() ?? '';
  return records.filter((item) => {
    const statusMatch =
      !filters.status || filters.status === 'ALL' || item.status === filters.status;
    const areaMatch = !filters.area || filters.area === 'ALL' || item.area === filters.area;
    const searchMatch =
      search.length === 0 ||
      item.name.toLowerCase().includes(search) ||
      item.summary.toLowerCase().includes(search);
    return statusMatch && areaMatch && searchMatch;
  });
}

export function filterWorkflowDiscovery(
  records: WorkflowDiscoveryRecord[],
  filters: WorkflowDiscoveryFilters,
): WorkflowDiscoveryRecord[] {
  return records.filter((item) => {
    const statusMatch =
      !filters.status || filters.status === 'ALL' || item.status === filters.status;
    const serviceTypeMatch =
      !filters.serviceType ||
      filters.serviceType === 'ALL' ||
      item.serviceType === filters.serviceType;
    return statusMatch && serviceTypeMatch;
  });
}

export function safeEvidence(items: string[]): string[] {
  return items.length > 0 ? items : ['No evidence recorded.'];
}

export const risks: RiskRecord[] = [
  {
    id: 'risk-auth',
    severity: 'CRITICAL',
    title: 'Provider-backed authentication is unavailable',
    evidence: 'services/hos-api/src/security/authentication.guard.ts',
    decision:
      'Approve identity provider, session, token, MFA, and step-up boundary before clinical use.',
  },
  {
    id: 'risk-audit',
    severity: 'HIGH',
    title: 'Audit is logging-backed rather than durable',
    evidence: 'services/hos-api/src/audit/logging-audit.publisher.ts',
    decision: 'Approve tamper-evident storage, retention, and review controls.',
  },
  {
    id: 'risk-encounter',
    severity: 'HIGH',
    title: 'Canonical Encounter and responsibility contexts are absent',
    evidence: 'No encounter module under services/hos-api/src/modules',
    decision:
      'Approve the P0 Encounter and Clinical Coordination boundaries before specialty work.',
  },
  {
    id: 'risk-gates',
    severity: 'MEDIUM',
    title: 'Root quality gates need a clean process-environment rerun',
    evidence: 'Architecture Realignment Checkpoint quality-gate section',
    decision: 'Resolve Turbo/process behavior without suppressing source diagnostics.',
  },
];

export function countCriteria(criteriaRecord: CapabilityCriteria): Record<EvidenceStatus, number> {
  const counts: Record<EvidenceStatus, number> = {
    VERIFIED: 0,
    PARTIAL: 0,
    MISSING: 0,
    NOT_APPLICABLE: 0,
    NOT_ASSESSED: 0,
    BROKEN: 0,
  };
  for (const key of CRITERION_KEYS) counts[criteriaRecord[key].status] += 1;
  return counts;
}
