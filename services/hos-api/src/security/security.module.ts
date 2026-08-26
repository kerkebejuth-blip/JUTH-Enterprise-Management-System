import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { RequestIdMiddleware } from './request-id.middleware';

/** Security foundation module for request identity and shared protections. */
@Module({
  providers: [RequestIdMiddleware],
})
export class SecurityModule implements NestModule {
  /** Registers security middleware across the API surface. */
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
