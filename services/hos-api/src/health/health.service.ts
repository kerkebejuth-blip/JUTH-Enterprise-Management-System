import { Injectable } from '@nestjs/common';

import { EnterpriseConfigService } from '../config';
import { APPLICATION_CONSTANTS } from '../constants/application.constants';
import { DatabaseService } from '../database';
import { DateUtils } from '../utils/date.utils';
import { HealthResponseDto } from './dto/health-response.dto';

const applicationStartedAt = Date.now();

/** Provides runtime health data for application and dependency checks. */
@Injectable()
export class HealthService {
  constructor(
    private readonly configService: EnterpriseConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  /** Returns current service health with database placeholder status. */
  getHealth(): HealthResponseDto {
    return {
      status: 'ok',
      database: this.databaseService.healthStatus(),
      uptimeSeconds: DateUtils.uptimeSeconds(applicationStartedAt),
      timestamp: DateUtils.nowIso(),
      version: APPLICATION_CONSTANTS.version,
      environment: this.configService.environment,
    };
  }
}
