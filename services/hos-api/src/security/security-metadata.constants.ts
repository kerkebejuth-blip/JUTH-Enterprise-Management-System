/** Metadata keys used by authorization decorators and guards. */
export const SECURITY_METADATA_KEYS = {
  public: 'juth:public',
  roles: 'juth:roles',
  permissions: 'juth:permissions',
  claims: 'juth:claims',
  policies: 'juth:policies',
  departments: 'juth:departments',
} as const;
