export { IdentityAuditEvent } from './audit';
export type {
  AuthenticationCredentials,
  AuthenticationProvider,
  AuthenticationStrategy,
  TokenPolicy,
  TokenRevocationStore,
  TokenService,
} from './authentication';
export type {
  Department,
  DeviceMetadata,
  IdentityClaim,
  Permission,
  Policy,
  Privilege,
  Role,
  Session,
  Token,
  TokenType,
  User,
  UserContext,
} from './domain';
export { IdentityController } from './identity.controller';
export { IdentityModule } from './identity.module';
export { IdentityService } from './identity.service';
export type {
  PasswordHashingService,
  PasswordHistoryStore,
  PasswordPolicy,
  PasswordValidationResult,
  PasswordValidator,
} from './password';
export { PERMISSION_REGISTRY, listRegisteredPermissions } from './permissions';
export type {
  SessionContext,
  SessionCreationMetadata,
  SessionManager,
  SessionPolicy,
} from './session';
export { createMockPolicyRequirement, createMockUserContext } from './testing';
