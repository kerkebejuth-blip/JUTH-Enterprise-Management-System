import { Injectable } from '@nestjs/common';

import { AuditService } from '../../audit';
import { EnterpriseConfigService } from '../../config';
import { EnterpriseLoggerService } from '../../logging';
import type { Permission } from './domain';
import { listRegisteredPermissions } from './permissions';

/** Coordinates IAM platform services and exposes identity metadata. */
@Injectable()
export class IdentityService {
  constructor(
    private readonly configService: EnterpriseConfigService,
    private readonly logger: EnterpriseLoggerService,
    private readonly auditService: AuditService,
  ) {}

  /** Returns registered permission definitions for internal IAM consumers. */
  getPermissions(): Permission[] {
    return listRegisteredPermissions();
  }

  /** Returns whether identity token configuration has been supplied. */
  get tokenConfigured(): boolean {
    return Boolean(this.configService.all.security.jwt.secret);
  }

  /** Records an identity platform audit event. */
  recordIdentityAudit(
    action: string,
    metadata?: Record<string, unknown>,
  ): void {
    void this.auditService.record({
      action,
      occurredAt: new Date().toISOString(),
      metadata,
    });
    this.logger.security(`Identity audit event recorded: ${action}`, metadata);
  }
}
