import type { ApplicationEnvironment } from '../types/environment.type';

/** Typed runtime configuration for the API process. */
export interface ApplicationConfig {
  app: {
    name: string;
    version: string;
    environment: ApplicationEnvironment;
    port: number;
  };
  logging: {
    level: string;
  };
  cors: {
    origins: string[];
    credentials: boolean;
  };
  database: {
    url?: string;
    provider: 'postgresql';
    host?: string;
    port: number;
    database?: string;
    username?: string;
    ssl: boolean;
    connectionLimit: number;
    slowQueryThresholdMs: number;
    queryLoggingEnabled: boolean;
    migrationsTable: string;
  };
  security: {
    rateLimitWindowMs: number;
    rateLimitMax: number;
    helmetEnabled: boolean;
    jwt: {
      issuer: string;
      audience: string;
      secret?: string;
      accessTokenTtlSeconds: number;
      refreshTokenTtlSeconds: number;
    };
    password: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumber: boolean;
      requireSymbol: boolean;
      historyLimit: number;
    };
    session: {
      maxConcurrentSessions: number;
      idleTimeoutSeconds: number;
      absoluteTimeoutSeconds: number;
    };
    cookie: {
      secure: boolean;
      httpOnly: boolean;
      sameSite: 'strict' | 'lax' | 'none';
    };
    mfa: {
      enabled: boolean;
    };
  };
  swagger: {
    enabled: boolean;
    path: string;
  };
}
