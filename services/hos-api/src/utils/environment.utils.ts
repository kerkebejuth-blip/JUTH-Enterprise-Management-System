import type { ApplicationEnvironment } from '../types/environment.type';

/** Utility helpers for runtime environment checks. */
export class EnvironmentUtils {
  /** Normalizes NODE_ENV into a supported application environment. */
  static normalize(value: string | undefined): ApplicationEnvironment {
    if (value === 'production' || value === 'test') {
      return value;
    }

    return 'development';
  }

  /** Indicates whether the runtime is production. */
  static isProduction(environment: ApplicationEnvironment): boolean {
    return environment === 'production';
  }
}
