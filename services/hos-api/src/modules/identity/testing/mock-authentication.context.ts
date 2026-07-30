import type { UserContext } from '../domain';

/** Creates a test-only user context for future IAM unit tests. */
export function createMockUserContext(
  overrides: Partial<UserContext> = {},
): UserContext {
  return {
    roles: [],
    permissions: [],
    claims: [],
    ...overrides,
  };
}
