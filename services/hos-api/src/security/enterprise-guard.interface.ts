import type { CanActivate } from '@nestjs/common';

/** Common contract for enterprise IAM guard implementations. */
export interface EnterpriseGuard extends CanActivate {
  canActivate: CanActivate['canActivate'];
}
