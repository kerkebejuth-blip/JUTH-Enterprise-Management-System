import { ApiProperty } from '@nestjs/swagger';

/** OpenAPI schema for standardized enterprise error responses. */
export class ApiErrorResponseDto {
  @ApiProperty({ example: false })
  success!: false;

  @ApiProperty({ example: '2026-07-27T20:00:00.000Z' })
  timestamp!: string;

  @ApiProperty({ example: '4f9e1d40-6dd0-4f56-84c3-01be8d74bb4d' })
  requestId!: string;

  @ApiProperty({ example: 400 })
  statusCode!: number;

  @ApiProperty({ example: 'VALIDATION_ERROR' })
  errorCode!: string;

  @ApiProperty({ example: 'Request validation failed.' })
  message!: string;

  @ApiProperty({ nullable: true })
  details?: unknown;

  @ApiProperty({ example: '/health' })
  path!: string;

  @ApiProperty({ example: 'GET' })
  method!: string;

  @ApiProperty({ example: '1' })
  version!: string;
}
