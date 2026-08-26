import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

import type { SortOrder } from '../database/pagination';

const sortOrders = ['asc', 'desc'] as const;

function toNumber(value: unknown, fallback: number): number {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return Number(value);
}

/** Standard offset pagination query parameters for enterprise APIs. */
export class OffsetPaginationQueryDto {
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

  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'desc', enum: sortOrders })
  @IsOptional()
  @IsIn(sortOrders)
  sortOrder?: SortOrder;
}

/** Standard cursor pagination query parameters for enterprise APIs. */
export class CursorPaginationQueryDto {
  @ApiPropertyOptional({ example: 'opaque-cursor-value' })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({ example: 25, minimum: 1, maximum: 100 })
  @Transform(({ value }) => toNumber(value, 25))
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 25;
}
