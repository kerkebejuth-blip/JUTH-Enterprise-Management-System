import { RequestContextService } from './request-context.service';

describe('RequestContextService', () => {
  it('propagates enterprise request metadata through AsyncLocalStorage', () => {
    const service = new RequestContextService();

    service.run(
      {
        requestId: 'request-1',
        correlationId: 'correlation-1',
        userId: 'user-1',
        department: 'department-1',
        facility: 'facility-1',
        tenant: 'tenant-1',
        sessionId: 'session-1',
        method: 'GET',
        path: '/health',
      },
      () => {
        expect(service.getRequestId()).toBe('request-1');
        expect(service.getCorrelationId()).toBe('correlation-1');
        expect(service.getUserId()).toBe('user-1');
        expect(service.getDepartment()).toBe('department-1');
        expect(service.getFacility()).toBe('facility-1');
        expect(service.getTenant()).toBe('tenant-1');
        expect(service.getSessionId()).toBe('session-1');
      },
    );
  });

  it('returns system identifiers outside an active request context', () => {
    const service = new RequestContextService();

    expect(service.getRequestId()).toBe('system');
    expect(service.getCorrelationId()).toBe('system');
  });
});
