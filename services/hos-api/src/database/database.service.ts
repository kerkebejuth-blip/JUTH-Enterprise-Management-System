import { Injectable } from '@nestjs/common';

import { EnterpriseConfigService } from '../config';
import { DatabaseHealthIndicator } from './health';

/** Database connection foundation with Prisma-ready provider boundaries. */
@Injectable()
export class DatabaseService {
  constructor(
    private readonly configService: EnterpriseConfigService,
    private readonly healthIndicator: DatabaseHealthIndicator,
  ) {}

  /** Indicates whether a database connection string has been configured. */
  get isConfigured(): boolean {
    return Boolean(this.configService.all.database.url);
  }

  /** Returns the current database health placeholder state. */
  healthStatus(): 'not_configured' | 'ready' {
    return this.isConfigured ? 'ready' : 'not_configured';
  }

  /** Returns detailed database health information. */
  async healthDetails(): Promise<{
    status: 'not_configured' | 'connected' | 'disconnected' | 'unhealthy';
    driver: string;
    latencyMs?: number;
    migrationStatus: 'not_configured' | 'pending' | 'current' | 'unknown';
  }> {
    return this.healthIndicator.check();
  }
}
