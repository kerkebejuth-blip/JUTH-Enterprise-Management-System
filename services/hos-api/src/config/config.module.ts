import { Global, Module } from '@nestjs/common';
import { config as loadDotenv } from 'dotenv';
import { existsSync } from 'fs';
import { resolve } from 'path';

import { buildConfiguration } from './configuration';
import type { ApplicationConfig } from './configuration.interface';
import { EnterpriseConfigService } from './enterprise-config.service';
import { validateEnvironment } from './environment.validation';

export const APPLICATION_CONFIG = Symbol('APPLICATION_CONFIG');

function loadEnvironmentFiles(): void {
  const environmentName = process.env.NODE_ENV ?? 'development';
  const candidates = [
    `.env.${environmentName}.local`,
    `.env.${environmentName}`,
    '.env.local',
    '.env',
  ];

  for (const fileName of candidates) {
    const filePath = resolve(process.cwd(), fileName);
    if (existsSync(filePath)) {
      loadDotenv({ path: filePath, override: false });
    }
  }
}

function createApplicationConfig(): ApplicationConfig {
  loadEnvironmentFiles();
  return buildConfiguration(validateEnvironment(process.env));
}

/** Global configuration module for validated, typed environment settings. */
@Global()
@Module({
  providers: [
    {
      provide: APPLICATION_CONFIG,
      useFactory: createApplicationConfig,
    },
    {
      provide: EnterpriseConfigService,
      inject: [APPLICATION_CONFIG],
      useFactory: (configuration: ApplicationConfig) =>
        new EnterpriseConfigService(configuration),
    },
  ],
  exports: [APPLICATION_CONFIG, EnterpriseConfigService],
})
export class EnterpriseConfigModule {}
