import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  ApplicationInfoDto,
  ApplicationVersionDto,
  HealthResponseDto,
} from './dto/health-response.dto';
import { HealthService } from './health.service';

/** Exposes operational health endpoints for platform monitoring. */
@ApiTags('Health Monitoring')
@Controller({ version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /** Returns application health and foundational dependency status. */
  @Get('health')
  @ApiOkResponse({ type: HealthResponseDto })
  getHealth(): Promise<HealthResponseDto> {
    return this.healthService.getHealth();
  }

  /** Returns readiness status for deployment and traffic routing. */
  @Get('ready')
  @ApiOkResponse({ type: HealthResponseDto })
  getReadiness(): Promise<HealthResponseDto> {
    return this.healthService.getReadiness();
  }

  /** Returns liveness status for process supervision. */
  @Get('live')
  @ApiOkResponse({ type: HealthResponseDto })
  getLiveness(): Promise<HealthResponseDto> {
    return this.healthService.getLiveness();
  }

  /** Returns application identity and environment metadata. */
  @Get('info')
  @ApiOkResponse({ type: ApplicationInfoDto })
  getApplicationInfo(): ApplicationInfoDto {
    return this.healthService.getApplicationInfo();
  }

  /** Returns the running application version. */
  @Get('version')
  @ApiOkResponse({ type: ApplicationVersionDto })
  getVersion(): ApplicationVersionDto {
    return this.healthService.getVersion();
  }
}
