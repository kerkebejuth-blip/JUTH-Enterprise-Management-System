import type { ApplicationEnvironment } from '../../types/environment.type';

/** Default settings for local development runs. */
export const developmentEnvironment = {
  environment: 'development' as ApplicationEnvironment,
  swaggerEnabled: true,
};
