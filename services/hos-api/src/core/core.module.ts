import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { EnterpriseConfigModule } from '../config';
import { LoggingModule, RequestLoggingMiddleware } from '../logging';
import {
  AuthorizationGuard,
  SecurityModule,
  RateLimitGuard,
} from '../security';
import { SharedModule } from '../shared';
import { RequestContextMiddleware } from './request-context.middleware';
import { RequestContextService } from './request-context.service';

/** Core singleton module for platform bootstrap services and infrastructure. */
@Module({
  imports: [
    EnterpriseConfigModule,
    LoggingModule,
    SecurityModule,
    SharedModule,
  ],
  providers: [
    RequestContextService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
  exports: [RequestContextService],
})
export class CoreModule implements NestModule {
  /** Registers cross-cutting request logging middleware. */
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestContextMiddleware, RequestLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
