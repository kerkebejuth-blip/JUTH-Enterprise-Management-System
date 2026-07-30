/** Device metadata associated with a user session. */
export interface DeviceMetadata {
  deviceId?: string;
  userAgent?: string;
  ipAddress?: string;
  platform?: string;
}

/** Session domain model reserved for future persistence. */
export interface Session {
  id: string;
  userId: string;
  tenantId?: string;
  departmentId?: string;
  facilityId?: string;
  device: DeviceMetadata;
  createdAt: string;
  expiresAt: string;
  lastSeenAt?: string;
}
