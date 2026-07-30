import { ApiProperty } from '@nestjs/swagger';

/** Health endpoint payload describing API and dependency readiness. */
export class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  status!: 'ok';

  @ApiProperty({
    example: {
      status: 'not_configured',
      driver: 'prisma-postgresql',
      latencyMs: 0,
      migrationStatus: 'not_configured',
    },
  })
  database!: {
    status: 'not_configured' | 'connected' | 'disconnected' | 'unhealthy';
    driver: string;
    latencyMs?: number;
    migrationStatus: 'not_configured' | 'pending' | 'current' | 'unknown';
  };

  @ApiProperty({ example: 12.345 })
  uptimeSeconds!: number;

  @ApiProperty({ example: '2026-07-27T20:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: '1.0.0' })
  version!: string;

  @ApiProperty({ example: 'development' })
  environment!: string;
}
