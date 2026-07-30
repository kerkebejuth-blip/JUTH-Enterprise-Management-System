/** Database provider abstraction for current and future persistence engines. */
export interface DatabaseProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  health(): Promise<DatabaseProviderHealth>;
}

/** Database provider health payload used by health indicators. */
export interface DatabaseProviderHealth {
  status: 'not_configured' | 'connected' | 'disconnected' | 'unhealthy';
  driver: string;
  latencyMs?: number;
  migrationStatus: 'not_configured' | 'pending' | 'current' | 'unknown';
}
