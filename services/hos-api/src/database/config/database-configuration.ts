import { Injectable } from '@nestjs/common';

import { EnterpriseConfigService } from '../../config';
import type { ApplicationConfig } from '../../config';

/** Provides typed database configuration for persistence infrastructure. */
@Injectable()
export class DatabaseConfiguration {
  constructor(private readonly configService: EnterpriseConfigService) {}

  /** Returns the full database configuration object. */
  get settings(): ApplicationConfig['database'] {
    return this.configService.all.database;
  }

  /** Indicates whether a PostgreSQL connection URL is configured. */
  get hasConnectionUrl(): boolean {
    return Boolean(this.settings.url);
  }
}
