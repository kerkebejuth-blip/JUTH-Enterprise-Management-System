import { Injectable } from '@nestjs/common';

import { EnterpriseConfigService } from '../config';

/** Database connection foundation with Prisma-ready provider boundaries. */
@Injectable()
export class DatabaseService {
  constructor(private readonly configService: EnterpriseConfigService) {}

  /** Indicates whether a database connection string has been configured. */
  get isConfigured(): boolean {
    return Boolean(this.configService.all.database.url);
  }

  /** Returns the current database health placeholder state. */
  healthStatus(): 'not_configured' | 'ready' {
    return this.isConfigured ? 'ready' : 'not_configured';
  }
}
