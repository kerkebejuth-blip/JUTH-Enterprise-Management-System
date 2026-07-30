import { ApiProperty } from '@nestjs/swagger';

/** Health endpoint payload describing API and dependency readiness. */
export class HealthResponseDto {
  @ApiProperty({ example: 'ok' })
  status!: 'ok';

  @ApiProperty({ example: 'not_configured' })
  database!: 'not_configured' | 'ready';

  @ApiProperty({ example: 12.345 })
  uptimeSeconds!: number;

  @ApiProperty({ example: '2026-07-27T20:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: '1.0.0' })
  version!: string;

  @ApiProperty({ example: 'development' })
  environment!: string;
}
