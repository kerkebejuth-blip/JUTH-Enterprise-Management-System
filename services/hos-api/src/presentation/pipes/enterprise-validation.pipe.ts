import { Injectable, ValidationPipe } from '@nestjs/common';

/** Reusable boundary validation pipe for presentation DTOs only. */
@Injectable()
export class EnterpriseValidationPipe extends ValidationPipe {
  /** Enables strict DTO transformation and rejects undeclared input fields. */
  constructor() {
    super({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    });
  }
}
