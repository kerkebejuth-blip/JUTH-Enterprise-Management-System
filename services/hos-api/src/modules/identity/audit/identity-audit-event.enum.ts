/** Identity audit events emitted by authentication and authorization workflows. */
export enum IdentityAuditEvent {
  Login = 'IDENTITY_LOGIN',
  Logout = 'IDENTITY_LOGOUT',
  TokenRefresh = 'IDENTITY_TOKEN_REFRESH',
  PasswordChange = 'IDENTITY_PASSWORD_CHANGE',
  PasswordReset = 'IDENTITY_PASSWORD_RESET',
  PermissionDenied = 'IDENTITY_PERMISSION_DENIED',
  AuthorizationDenied = 'IDENTITY_AUTHORIZATION_DENIED',
  RoleChanged = 'IDENTITY_ROLE_CHANGED',
}
