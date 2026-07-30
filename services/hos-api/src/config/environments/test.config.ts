import type { ApplicationEnvironment } from '../../types/environment.type';

/** Default settings for automated test runs. */
export const testEnvironment = {
  environment: 'test' as ApplicationEnvironment,
  swaggerEnabled: false,
};
