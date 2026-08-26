import { Injectable } from '@nestjs/common';

import { EnterpriseConfigService } from '../config';
import { APPLICATION_CONSTANTS } from '../constants/application.constants';
import { DatabaseService } from '../database';
import { DateUtils } from '../utils/date.utils';
import {
  ApplicationInfoDto,
  ApplicationVersionDto,
  HealthResponseDto,
  HealthStatus,
} from './dto/health-response.dto';

const applicationStartedAt = Date.now();

/** Provides runtime health data for application and dependency checks. */
@Injectable()
export class HealthService {
  constructor(
    private readonly configService: EnterpriseConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  /** Returns current service health with database placeholder status. */
  async getHealth(): Promise<HealthResponseDto> {
    return this.buildHealthResponse('ok');
  }

  /** Returns readiness status for load balancers and deployment checks. */
  async getReadiness(): Promise<HealthResponseDto> {
    return this.buildHealthResponse('ready');
  }

  /** Returns liveness status for process supervision checks. */
  async getLiveness(): Promise<HealthResponseDto> {
    return this.buildHealthResponse('live');
  }

  /** Returns application identity and environment information. */
  getApplicationInfo(): ApplicationInfoDto {
    return {
      name: APPLICATION_CONSTANTS.shortName,
      version: APPLICATION_CONSTANTS.version,
      environment: this.configService.environment,
      timestamp: DateUtils.nowIso(),
    };
  }

  /** Returns the running application semantic version. */
  getVersion(): ApplicationVersionDto {
    return {
      version: APPLICATION_CONSTANTS.version,
    };
  }

  private async buildHealthResponse(
    status: HealthStatus,
  ): Promise<HealthResponseDto> {
    return {
      status,
      database: await this.databaseService.healthDetails(),
      uptimeSeconds: DateUtils.uptimeSeconds(applicationStartedAt),
      timestamp: DateUtils.nowIso(),
      version: APPLICATION_CONSTANTS.version,
      environment: this.configService.environment,
    };
  }
}
