import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { EnterpriseLoggerService } from '../../logging';
import { DatabaseConfiguration } from '../config';
import { InfrastructureException } from '../../filters/exceptions';
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
  private client: PrismaClient | undefined;

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
  connect(): Promise<void> {
    if (!this.configuration.hasConnectionUrl) {
      this.connected = false;
      this.logger.database('Database connection URL is not configured.');
      return Promise.resolve();
    }

    return this.getClient()
      .$connect()
      .then(() => {
        this.connected = true;
        this.logger.database('Prisma provider connected to PostgreSQL.');
      });
  }

  /** Disconnects the Prisma provider boundary. */
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.$disconnect();
      this.client = undefined;
    }

    this.connected = false;
  }

  /** Returns current provider health and migration placeholder status. */
  health(): Promise<DatabaseProviderHealth> {
    const startedAt = Date.now();
    const configured = this.configuration.hasConnectionUrl;

    return Promise.resolve({
      status: configured && this.connected ? 'connected' : 'not_configured',
      driver: 'prisma-postgresql',
      latencyMs: Date.now() - startedAt,
      migrationStatus: configured ? 'unknown' : 'not_configured',
    });
  }

  /** Returns the lazily-created Prisma client for infrastructure adapters. */
  getClient(): PrismaClient {
    if (!this.configuration.hasConnectionUrl) {
      throw new InfrastructureException(
        'Database connection URL is not configured.',
      );
    }

    if (!this.client) {
      const adapter = new PrismaPg(this.configuration.settings.url as string);
      this.client = new PrismaClient({ adapter });
    }

    return this.client;
  }
}
