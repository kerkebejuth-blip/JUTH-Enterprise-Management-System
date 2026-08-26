import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { App } from 'supertest/types';

import { AppModule } from '../../src/app.module';
import { configureEnterpriseApplication } from '../../src/bootstrap';

/** Creates a Nest application configured with enterprise runtime foundations. */
export async function createEnterpriseTestApplication(): Promise<
  INestApplication<App>
> {
  const testingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  const app = testingModule.createNestApplication();

  configureEnterpriseApplication(app);
  await app.init();

  return app;
}
