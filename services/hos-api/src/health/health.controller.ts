import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { HealthResponseDto } from './dto/health-response.dto';
import { HealthService } from './health.service';

/** Exposes operational health endpoints for platform monitoring. */
@ApiTags('Health')
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /** Returns application health and foundational dependency status. */
  @Get()
  @ApiOkResponse({ type: HealthResponseDto })
  getHealth(): Promise<HealthResponseDto> {
    return this.healthService.getHealth();
  }
}
