import { ApiProperty } from '@nestjs/swagger';

/** OpenAPI schema for standardized successful API responses. */
export class ApiResponseEnvelopeDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty({ example: 'Request completed successfully.' })
  message!: string;

  @ApiProperty({ example: '2026-07-27T20:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: '4f9e1d40-6dd0-4f56-84c3-01be8d74bb4d' })
  requestId!: string;

  @ApiProperty({ example: '1' })
  version!: string;

  @ApiProperty({ nullable: true })
  data!: unknown;

  @ApiProperty({ example: { durationMs: 12, correlationId: 'correlation-id' } })
  metadata!: Record<string, unknown>;
}
