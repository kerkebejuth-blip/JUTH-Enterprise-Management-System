import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { EnterpriseConfigService } from './config';
import { APPLICATION_CONSTANTS } from './constants/application.constants';
import { RequestContextService } from './core';
import { GlobalExceptionFilter } from './filters';
import {
  ExecutionTimingInterceptor,
  ResponseWrapperInterceptor,
} from './interceptors';
import { EnterpriseLoggerService } from './logging';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnterpriseConfigService);
  const logger = app.get(EnterpriseLoggerService);
  const config = configService.all;

  app.useLogger(logger);
  app.enableShutdownHooks();
  if (config.security.helmetEnabled) {
    app.use(helmet());
  }
  app.use(compression());
  app.enableCors({
    origin: config.cors.origins.length > 0 ? config.cors.origins : true,
    credentials: config.cors.credentials,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: APPLICATION_CONSTANTS.apiVersion,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const requestContextService = app.get(RequestContextService);
  app.useGlobalFilters(
    new GlobalExceptionFilter(logger, requestContextService),
  );
  app.useGlobalInterceptors(
    new ExecutionTimingInterceptor(logger),
    new ResponseWrapperInterceptor(requestContextService),
  );

  if (configService.swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APPLICATION_CONSTANTS.shortName)
      .setDescription(APPLICATION_CONSTANTS.description)
      .setVersion(APPLICATION_CONSTANTS.version)
      .addBearerAuth()
      .addApiKey(
        {
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
        },
        'ApiKeyAuth',
      )
      .addOAuth2(
        {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: '/identity/oauth2/authorize',
              tokenUrl: '/identity/oauth2/token',
              scopes: {},
            },
          },
        },
        'OAuth2',
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(config.swagger.path, app, document);
  }

  await app.listen(configService.port);
  logger.startup(
    `${APPLICATION_CONSTANTS.shortName} listening on port ${configService.port} (${configService.environment})`,
  );
}

void bootstrap();
