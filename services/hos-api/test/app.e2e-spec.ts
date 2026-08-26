import { type INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';

import { createEnterpriseTestApplication } from './utils/create-test-application';

describe('HealthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    app = await createEnterpriseTestApplication();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('x-request-id', /.+/)
      .expect('x-correlation-id', /.+/)
      .expect(({ body }: { body: unknown }) => {
        expect(body).toMatchObject({
          success: true,
          requestId: expect.any(String) as string,
          version: '1',
          data: {
            status: 'ok',
            database: {
              status: 'not_configured',
              driver: 'prisma-postgresql',
              migrationStatus: 'not_configured',
            },
          },
        });
      });
  });

  it('/ready (GET)', () => {
    return request(app.getHttpServer())
      .get('/ready')
      .expect(200)
      .expect(({ body }: { body: unknown }) => {
        expect(body).toMatchObject({
          success: true,
          data: {
            status: 'ready',
          },
        });
      });
  });

  it('/live (GET)', () => {
    return request(app.getHttpServer())
      .get('/live')
      .expect(200)
      .expect(({ body }: { body: unknown }) => {
        expect(body).toMatchObject({
          success: true,
          data: {
            status: 'live',
          },
        });
      });
  });

  it('/api/v1/patients (GET) fails closed until IAM is configured', () => {
    return request(app.getHttpServer())
      .get('/api/v1/patients?search=ab')
      .expect(403)
      .expect('x-correlation-id', /.+/)
      .expect(({ body }: { body: unknown }) => {
        expect(body).toMatchObject({
          success: false,
          statusCode: 403,
          errorCode: 'AUTHORIZATION_ERROR',
        });
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
