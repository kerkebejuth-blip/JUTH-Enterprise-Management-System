import { Injectable } from '@nestjs/common';

import { PrismaTransactionManager } from '../../../../infrastructure/transactions';
import type { PatientIdentifier } from '../../domain';
import type { PatientIdentifierUniquenessPort } from '../../application/ports';

/** Prisma adapter for globally scoped patient-identifier uniqueness checks. */
@Injectable()
export class PrismaPatientIdentifierUniquenessAdapter implements PatientIdentifierUniquenessPort {
  constructor(private readonly transactionManager: PrismaTransactionManager) {}

  /** Returns whether an identifier is unused outside the supplied patient. */
  async isUnique(
    identifier: PatientIdentifier,
    patientId?: string,
  ): Promise<boolean> {
    const match = await this.transactionManager
      .getClient()
      .patientIdentifier.findFirst({
        where: {
          type: identifier.type,
          assigningAuthority: identifier.assigningAuthority,
          value: identifier.value,
          ...(patientId ? { patientId: { not: patientId } } : {}),
        },
        select: { id: true },
      });
    return match === null;
  }
}
