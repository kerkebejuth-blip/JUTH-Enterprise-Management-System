import { ApiProperty } from '@nestjs/swagger';

export type HealthStatus = 'ok' | 'ready' | 'live';

export type DatabaseDependencyStatus =
  'not_configured' | 'connected' | 'disconnected' | 'unhealthy';

export type MigrationStatus =
  'not_configured' | 'pending' | 'current' | 'unknown';

/** Database dependency payload for health monitoring endpoints. */
export class DatabaseHealthDto {
  @ApiProperty({ example: 'not_configured' })
  status!: DatabaseDependencyStatus;

  @ApiProperty({ example: 'prisma-postgresql' })
  driver!: string;

  @ApiProperty({ example: 12, required: false })
  latencyMs?: number;

  @ApiProperty({ example: 'not_configured' })
  migrationStatus!: MigrationStatus;
}

/** Health endpoint payload describing API and dependency readiness. */
export class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  status!: HealthStatus;

  @ApiProperty({ type: DatabaseHealthDto })
  database!: DatabaseHealthDto;

  @ApiProperty({ example: 12.345 })
  uptimeSeconds!: number;

  @ApiProperty({ example: '2026-07-27T20:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: '1.0.0' })
  version!: string;

  @ApiProperty({ example: 'development' })
  environment!: string;
}

/** Application information payload for platform inspection endpoints. */
export class ApplicationInfoDto {
  @ApiProperty({ example: 'JUTH HOS API' })
  name!: string;

  @ApiProperty({ example: '1.0.0' })
  version!: string;

  @ApiProperty({ example: 'development' })
  environment!: string;

  @ApiProperty({ example: '2026-07-27T20:00:00.000Z' })
  timestamp!: string;
}

/** Application version payload for platform inspection endpoints. */
export class ApplicationVersionDto {
  @ApiProperty({ example: '1.0.0' })
  version!: string;
}
