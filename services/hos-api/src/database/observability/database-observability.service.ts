import { Injectable } from '@nestjs/common';

import { EnterpriseConfigService } from '../../config';
import { EnterpriseLoggerService } from '../../logging';

/** Provides database query logging, slow query checks, and metrics hooks. */
@Injectable()
export class DatabaseObservabilityService {
  constructor(
    private readonly configService: EnterpriseConfigService,
    private readonly logger: EnterpriseLoggerService,
  ) {}

  /** Records a query execution event when database query logging is enabled. */
  recordQuery(operation: string, durationMs: number): void {
    const settings = this.configService.all.database;
    if (settings.queryLoggingEnabled) {
      this.logger.database(`Database query executed: ${operation}`, {
        durationMs,
      });
    }

    if (durationMs >= settings.slowQueryThresholdMs) {
      this.logger.performance(
        `Slow database query detected: ${operation} completed in ${durationMs}ms`,
      );
    }
  }

  /** Returns connection metrics placeholder values. */
  connectionMetrics(): Record<string, unknown> {
    return {
      activeConnections: undefined,
      idleConnections: undefined,
      maxConnections: this.configService.all.database.connectionLimit,
    };
  }
}
