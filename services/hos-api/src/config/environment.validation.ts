import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { plainToInstance, Transform } from 'class-transformer';

import type { ApplicationEnvironment } from '../types/environment.type';

const booleanValues = ['true', 'false'] as const;

function normalizePrimitive(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  return undefined;
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return normalizePrimitive(value)?.toLowerCase() === 'true';
}

function toOptionalBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  return normalizePrimitive(value)?.toLowerCase() === 'true';
}

function toNumber(value: unknown, fallback: number): number {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return Number(value);
}

/** Validated representation of process environment variables. */
export class EnvironmentVariables {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV: ApplicationEnvironment = 'development';

  @Transform(({ value }) => toNumber(value, 3000))
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT = 3000;

  @IsOptional()
  @IsString()
  DATABASE_URL?: string;

  @IsOptional()
  @IsString()
  DATABASE_HOST?: string;

  @Transform(({ value }) => toNumber(value, 5432))
  @IsInt()
  @Min(1)
  @Max(65535)
  DATABASE_PORT = 5432;

  @IsOptional()
  @IsString()
  DATABASE_NAME?: string;

  @IsOptional()
  @IsString()
  DATABASE_USER?: string;

  @Transform(({ value }) => toBoolean(value, false))
  @IsBoolean()
  DATABASE_SSL = false;

  @Transform(({ value }) => toNumber(value, 10))
  @IsInt()
  @Min(1)
  DATABASE_CONNECTION_LIMIT = 10;

  @Transform(({ value }) => toNumber(value, 500))
  @IsInt()
  @Min(1)
  DATABASE_SLOW_QUERY_THRESHOLD_MS = 500;

  @Transform(({ value }) => toBoolean(value, false))
  @IsBoolean()
  DATABASE_QUERY_LOGGING_ENABLED = false;

  @IsOptional()
  @IsString()
  DATABASE_MIGRATIONS_TABLE?: string;

  @IsOptional()
  @IsString()
  CORS_ORIGINS?: string;

  @IsOptional()
  @IsString()
  LOG_LEVEL?: string;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  CORS_CREDENTIALS = true;

  @Transform(({ value }) => toNumber(value, 60000))
  @IsInt()
  @Min(1000)
  RATE_LIMIT_WINDOW_MS = 60000;

  @Transform(({ value }) => toNumber(value, 100))
  @IsInt()
  @Min(1)
  RATE_LIMIT_MAX = 100;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  HELMET_ENABLED = true;

  @IsOptional()
  @IsString()
  JWT_ISSUER?: string;

  @IsOptional()
  @IsString()
  JWT_AUDIENCE?: string;

  @IsOptional()
  @IsString()
  JWT_SECRET?: string;

  @Transform(({ value }) => toNumber(value, 900))
  @IsInt()
  @Min(60)
  JWT_ACCESS_TOKEN_TTL_SECONDS = 900;

  @Transform(({ value }) => toNumber(value, 604800))
  @IsInt()
  @Min(300)
  JWT_REFRESH_TOKEN_TTL_SECONDS = 604800;

  @Transform(({ value }) => toNumber(value, 12))
  @IsInt()
  @Min(8)
  PASSWORD_MIN_LENGTH = 12;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  PASSWORD_REQUIRE_UPPERCASE = true;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  PASSWORD_REQUIRE_LOWERCASE = true;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  PASSWORD_REQUIRE_NUMBER = true;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  PASSWORD_REQUIRE_SYMBOL = true;

  @Transform(({ value }) => toNumber(value, 5))
  @IsInt()
  @Min(0)
  PASSWORD_HISTORY_LIMIT = 5;

  @Transform(({ value }) => toNumber(value, 3))
  @IsInt()
  @Min(1)
  SESSION_MAX_CONCURRENT = 3;

  @Transform(({ value }) => toNumber(value, 1800))
  @IsInt()
  @Min(60)
  SESSION_IDLE_TIMEOUT_SECONDS = 1800;

  @Transform(({ value }) => toNumber(value, 43200))
  @IsInt()
  @Min(300)
  SESSION_ABSOLUTE_TIMEOUT_SECONDS = 43200;

  @Transform(({ value }) => toBoolean(value, true))
  @IsBoolean()
  COOKIE_HTTP_ONLY = true;

  @Transform(({ value }) => toBoolean(value, false))
  @IsBoolean()
  COOKIE_SECURE = false;

  @IsOptional()
  @IsIn(['strict', 'lax', 'none'])
  COOKIE_SAME_SITE?: 'strict' | 'lax' | 'none';

  @Transform(({ value }) => toBoolean(value, false))
  @IsBoolean()
  MFA_ENABLED = false;

  @Transform(({ value }) => toOptionalBoolean(value))
  @IsOptional()
  @IsBoolean()
  SWAGGER_ENABLED?: boolean;

  @IsOptional()
  @IsString()
  SWAGGER_PATH?: string;

  @IsOptional()
  @IsIn(booleanValues)
  TRUST_PROXY?: string;
}

/** Validates and transforms raw environment variables for typed config. */
export function validateEnvironment(
  environment: NodeJS.ProcessEnv,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, environment, {
    enableImplicitConversion: false,
    exposeDefaultValues: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    whitelist: true,
    forbidUnknownValues: false,
  });

  if (errors.length > 0) {
    const messages = errors
      .flatMap((error) => Object.values(error.constraints ?? {}))
      .join('; ');
    throw new Error(`Invalid environment configuration: ${messages}`);
  }

  return validatedConfig;
}
