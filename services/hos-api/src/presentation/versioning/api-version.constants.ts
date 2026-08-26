/** Stable URI prefix and version for future enterprise application APIs. */
export const API_VERSIONING = {
  prefix: 'api',
  version: '1',
  path: 'api/v1',
} as const;

/** Operational endpoints intentionally remain version-neutral for probes. */
export const NEUTRAL_OPERATIONAL_ENDPOINTS = [
  'health',
  'ready',
  'live',
  'info',
  'version',
] as const;
