import { Injectable } from '@nestjs/common';

import type { ApplicationConfig } from './configuration.interface';

/** Provides typed access to validated enterprise application configuration. */
@Injectable()
export class EnterpriseConfigService {
  constructor(private readonly configuration: ApplicationConfig) {}

  /** Returns the full typed configuration object. */
  get all(): ApplicationConfig {
    return this.configuration;
  }

  /** Returns the configured HTTP port. */
  get port(): number {
    return this.configuration.app.port;
  }

  /** Returns the current application environment. */
  get environment(): ApplicationConfig['app']['environment'] {
    return this.configuration.app.environment;
  }

  /** Returns whether Swagger documentation should be exposed. */
  get swaggerEnabled(): boolean {
    return this.configuration.swagger.enabled;
  }
}
