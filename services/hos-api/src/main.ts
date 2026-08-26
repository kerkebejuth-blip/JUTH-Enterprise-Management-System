import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { configureEnterpriseApplication } from './bootstrap';
import { EnterpriseConfigService } from './config';
import { APPLICATION_CONSTANTS } from './constants/application.constants';
import { EnterpriseLoggerService } from './logging';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnterpriseConfigService);
  const logger = app.get(EnterpriseLoggerService);
  const config = configService.all;

  configureEnterpriseApplication(app);
  app.enableShutdownHooks();
  if (config.security.helmetEnabled) {
    app.use(helmet());
  }
  app.use(compression());
  app.enableCors({
    origin: config.cors.origins.length > 0 ? config.cors.origins : true,
    credentials: config.cors.credentials,
  });
  if (configService.swaggerEnabled) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APPLICATION_CONSTANTS.shortName)
      .setDescription(APPLICATION_CONSTANTS.description)
      .setVersion(APPLICATION_CONSTANTS.version)
      .addServer('/api/v1', 'Enterprise API v1')
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
