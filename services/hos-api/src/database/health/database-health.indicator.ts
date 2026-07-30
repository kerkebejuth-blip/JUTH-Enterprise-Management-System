import { Injectable } from '@nestjs/common';

import { PrismaProvider } from '../providers';

/** Health indicator for database connectivity and migration status. */
@Injectable()
export class DatabaseHealthIndicator {
  constructor(private readonly provider: PrismaProvider) {}

  /** Returns database health details for application health endpoints. */
  async check(): Promise<DatabaseHealthDetails> {
    return this.provider.health();
  }
}

/** Database health details exposed to health monitoring. */
export interface DatabaseHealthDetails {
  status: 'not_configured' | 'connected' | 'disconnected' | 'unhealthy';
  driver: string;
  latencyMs?: number;
  migrationStatus: 'not_configured' | 'pending' | 'current' | 'unknown';
}
