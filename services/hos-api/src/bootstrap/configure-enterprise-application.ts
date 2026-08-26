import {
  RequestMethod,
  VersioningType,
  type INestApplication,
} from '@nestjs/common';

import { APPLICATION_CONSTANTS } from '../constants/application.constants';
import { RequestContextService } from '../core';
import { GlobalExceptionFilter } from '../filters';
import {
  ExecutionTimingInterceptor,
  ResponseWrapperInterceptor,
} from '../interceptors';
import { EnterpriseLoggerService } from '../logging';
import {
  API_VERSIONING,
  EnterpriseValidationPipe,
  NEUTRAL_OPERATIONAL_ENDPOINTS,
} from '../presentation';

/** Applies enterprise API runtime foundations shared by production and tests. */
export function configureEnterpriseApplication(app: INestApplication): void {
  const logger = app.get(EnterpriseLoggerService);
  const requestContextService = app.get(RequestContextService);

  app.useLogger(logger);
  app.setGlobalPrefix(API_VERSIONING.prefix, {
    exclude: NEUTRAL_OPERATIONAL_ENDPOINTS.map((path) => ({
      path,
      method: RequestMethod.ALL,
    })),
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: APPLICATION_CONSTANTS.apiVersion,
  });
  app.useGlobalPipes(new EnterpriseValidationPipe());
  app.useGlobalFilters(
    new GlobalExceptionFilter(logger, requestContextService),
  );
  app.useGlobalInterceptors(
    new ExecutionTimingInterceptor(logger),
    new ResponseWrapperInterceptor(requestContextService),
  );
}
