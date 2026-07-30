import { APPLICATION_CONSTANTS } from '../constants/application.constants';
import { EnvironmentUtils } from '../utils/environment.utils';
import type { ApplicationConfig } from './configuration.interface';
import {
  developmentEnvironment,
  productionEnvironment,
  testEnvironment,
} from './environments';
import type { EnvironmentVariables } from './environment.validation';

function parseOrigins(rawOrigins: string | undefined): string[] {
  if (!rawOrigins?.trim()) {
    return [];
  }

  return rawOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

/** Builds the typed application configuration from validated environment data. */
export function buildConfiguration(
  environment: EnvironmentVariables,
): ApplicationConfig {
  const normalizedEnvironment = EnvironmentUtils.normalize(
    environment.NODE_ENV,
  );
  const environmentDefaults = {
    development: developmentEnvironment,
    production: productionEnvironment,
    test: testEnvironment,
  }[normalizedEnvironment];

  return {
    app: {
      name: APPLICATION_CONSTANTS.name,
      version: APPLICATION_CONSTANTS.version,
      environment: normalizedEnvironment,
      port: environment.PORT,
    },
    logging: {
      level: environment.LOG_LEVEL ?? 'info',
    },
    cors: {
      origins: parseOrigins(environment.CORS_ORIGINS),
      credentials: environment.CORS_CREDENTIALS,
    },
    database: {
      url: environment.DATABASE_URL,
      provider: 'postgresql',
      host: environment.DATABASE_HOST,
      port: environment.DATABASE_PORT,
      database: environment.DATABASE_NAME,
      username: environment.DATABASE_USER,
      ssl: environment.DATABASE_SSL,
      connectionLimit: environment.DATABASE_CONNECTION_LIMIT,
      slowQueryThresholdMs: environment.DATABASE_SLOW_QUERY_THRESHOLD_MS,
      queryLoggingEnabled: environment.DATABASE_QUERY_LOGGING_ENABLED,
      migrationsTable: environment.DATABASE_MIGRATIONS_TABLE ?? '_prisma_migrations',
    },
    security: {
      rateLimitWindowMs: environment.RATE_LIMIT_WINDOW_MS,
      rateLimitMax: environment.RATE_LIMIT_MAX,
      helmetEnabled: environment.HELMET_ENABLED,
      jwt: {
        issuer: environment.JWT_ISSUER ?? APPLICATION_CONSTANTS.shortName,
        audience: environment.JWT_AUDIENCE ?? 'juth-hos',
        secret: environment.JWT_SECRET,
        accessTokenTtlSeconds: environment.JWT_ACCESS_TOKEN_TTL_SECONDS,
        refreshTokenTtlSeconds: environment.JWT_REFRESH_TOKEN_TTL_SECONDS,
      },
      password: {
        minLength: environment.PASSWORD_MIN_LENGTH,
        requireUppercase: environment.PASSWORD_REQUIRE_UPPERCASE,
        requireLowercase: environment.PASSWORD_REQUIRE_LOWERCASE,
        requireNumber: environment.PASSWORD_REQUIRE_NUMBER,
        requireSymbol: environment.PASSWORD_REQUIRE_SYMBOL,
        historyLimit: environment.PASSWORD_HISTORY_LIMIT,
      },
      session: {
        maxConcurrentSessions: environment.SESSION_MAX_CONCURRENT,
        idleTimeoutSeconds: environment.SESSION_IDLE_TIMEOUT_SECONDS,
        absoluteTimeoutSeconds: environment.SESSION_ABSOLUTE_TIMEOUT_SECONDS,
      },
      cookie: {
        secure: environment.COOKIE_SECURE,
        httpOnly: environment.COOKIE_HTTP_ONLY,
        sameSite: environment.COOKIE_SAME_SITE ?? 'lax',
      },
      mfa: {
        enabled: environment.MFA_ENABLED,
      },
    },
    swagger: {
      enabled:
        environment.SWAGGER_ENABLED ?? environmentDefaults.swaggerEnabled,
      path: environment.SWAGGER_PATH ?? APPLICATION_CONSTANTS.swaggerPath,
    },
  };
}
