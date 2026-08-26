/** Enterprise application constants shared across the API runtime. */
export const APPLICATION_CONSTANTS = {
  name: 'JUTH Enterprise Hospital Operating System API',
  shortName: 'JUTH HOS API',
  description:
    'Enterprise backend foundation for the JUTH Hospital Operating System.',
  version: '1.0.0',
  defaultPort: 3000,
  apiVersion: '1',
  swaggerPath: 'docs',
} as const;

/** Standard HTTP header names used by platform infrastructure. */
export const HEADER_NAMES = {
  requestId: 'x-request-id',
  correlationId: 'x-correlation-id',
  userId: 'x-user-id',
  department: 'x-department',
  facility: 'x-facility-id',
  tenant: 'x-tenant-id',
  sessionId: 'x-session-id',
  responseTime: 'x-response-time-ms',
  authorization: 'authorization',
} as const;

/** Role keys reserved for future authorization modules. */
export const ROLE_KEYS = {
  systemAdministrator: 'system_administrator',
  clinicalStaff: 'clinical_staff',
  administrativeStaff: 'administrative_staff',
} as const;

/** Permission keys reserved for future authorization modules. */
export const PERMISSION_KEYS = {
  platformAccess: 'platform.access',
  auditRead: 'audit.read',
  configurationRead: 'configuration.read',
} as const;

/** Standard OpenAPI tags used to group API documentation. */
export const OPENAPI_TAGS = {
  health: 'Health Monitoring',
  platform: 'Platform',
  patient: 'Patient Identity',
  security: 'Security',
  audit: 'Audit',
} as const;
