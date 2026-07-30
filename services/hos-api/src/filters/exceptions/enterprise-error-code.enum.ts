/** Enterprise error code taxonomy used by standardized error responses. */
export enum EnterpriseErrorCode {
  Authentication = 'AUTHENTICATION_ERROR',
  Validation = 'VALIDATION_ERROR',
  Business = 'BUSINESS_ERROR',
  Authorization = 'AUTHORIZATION_ERROR',
  InvalidToken = 'INVALID_TOKEN',
  ExpiredToken = 'EXPIRED_TOKEN',
  PermissionDenied = 'PERMISSION_DENIED',
  RoleDenied = 'ROLE_DENIED',
  NotFound = 'NOT_FOUND',
  Conflict = 'CONFLICT',
  Infrastructure = 'INFRASTRUCTURE_ERROR',
  Security = 'SECURITY_ERROR',
  Database = 'DATABASE_ERROR',
  Unexpected = 'UNEXPECTED_ERROR',
}
