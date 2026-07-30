import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { EnterpriseLoggerService } from '../../logging';
import { DatabaseConfiguration } from '../config';
import type {
  DatabaseProvider,
  DatabaseProviderHealth,
} from './database-provider.interface';

/** Prisma-backed database provider boundary for PostgreSQL persistence. */
@Injectable()
export class PrismaProvider
  implements DatabaseProvider, OnModuleInit, OnModuleDestroy
{
  private connected = false;

  constructor(
    private readonly configuration: DatabaseConfiguration,
    private readonly logger: EnterpriseLoggerService,
  ) {}

  /** Opens the provider connection when database configuration is available. */
  async onModuleInit(): Promise<void> {
    await this.connect();
  }

  /** Closes provider resources during application shutdown. */
  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  /** Connects the Prisma provider boundary. */
  async connect(): Promise<void> {
    if (!this.configuration.hasConnectionUrl) {
      this.connected = false;
      this.logger.database('Database connection URL is not configured.');
      return;
    }

    this.connected = true;
    this.logger.database('Prisma provider connection boundary initialized.');
  }

  /** Disconnects the Prisma provider boundary. */
  async disconnect(): Promise<void> {
    this.connected = false;
  }

  /** Returns current provider health and migration placeholder status. */
  async health(): Promise<DatabaseProviderHealth> {
    const startedAt = Date.now();
    const configured = this.configuration.hasConnectionUrl;

    return {
      status: configured && this.connected ? 'connected' : 'not_configured',
      driver: 'prisma-postgresql',
      latencyMs: Date.now() - startedAt,
      migrationStatus: configured ? 'unknown' : 'not_configured',
    };
  }
}
