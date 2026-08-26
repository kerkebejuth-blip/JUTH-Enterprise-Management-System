import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

const sortDirections = ['asc', 'desc'] as const;

function toNumber(value: unknown, fallback: number): number {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return Number(value);
}

/** Standard query contract for pagination, filtering, and search. */
export class EnterpriseQueryDto {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @Transform(({ value }) => toNumber(value, 1))
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ example: 25, minimum: 1, maximum: 100 })
  @Transform(({ value }) => toNumber(value, 25))
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize = 25;

  @ApiPropertyOptional({ example: 'updatedAt' })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({ example: 'desc', enum: sortDirections })
  @IsOptional()
  @IsIn(sortDirections)
  direction?: (typeof sortDirections)[number];

  @ApiPropertyOptional({ example: 'status=active' })
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiPropertyOptional({ example: 'hospital number' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'opaque-cursor-value' })
  @IsOptional()
  @IsString()
  cursor?: string;
}
