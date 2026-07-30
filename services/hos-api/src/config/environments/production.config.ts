import type { ApplicationEnvironment } from '../../types/environment.type';

/** Default settings for production deployments. */
export const productionEnvironment = {
  environment: 'production' as ApplicationEnvironment,
  swaggerEnabled: false,
};
