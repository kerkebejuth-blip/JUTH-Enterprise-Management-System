import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  type OnModuleDestroy,
} from '@nestjs/common';
import type { Request } from 'express';

import { EnterpriseConfigService } from '../config';

interface RateLimitRecord {
  count: number;
  expiresAt: number;
}

/** Basic in-memory rate limiting foundation for future externalization. */
@Injectable()
export class RateLimitGuard implements CanActivate, OnModuleDestroy {
  private readonly records = new Map<string, RateLimitRecord>();
  private readonly cleanupInterval: NodeJS.Timeout;

  constructor(private readonly configService: EnterpriseConfigService) {
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    this.cleanupInterval.unref();
  }

  /** Allows or rejects requests based on configured per-IP thresholds. */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.ip || 'unknown';
    const now = Date.now();
    const { rateLimitMax, rateLimitWindowMs } = this.configService.all.security;
    const current = this.records.get(key);

    if (!current || current.expiresAt <= now) {
      this.records.set(key, {
        count: 1,
        expiresAt: now + rateLimitWindowMs,
      });
      return true;
    }

    current.count += 1;

    if (current.count > rateLimitMax) {
      throw new HttpException(
        'Rate limit exceeded.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }

  /** Clears interval resources when the module is destroyed. */
  onModuleDestroy(): void {
    clearInterval(this.cleanupInterval);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (record.expiresAt <= now) {
        this.records.delete(key);
      }
    }
  }
}
