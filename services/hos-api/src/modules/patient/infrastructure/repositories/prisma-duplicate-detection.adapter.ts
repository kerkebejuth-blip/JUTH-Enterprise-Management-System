import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaTransactionManager } from '../../../../infrastructure/transactions';
import type { DuplicateCandidate, Patient } from '../../domain';
import type { DuplicateDetectionPort } from '../../application/ports';
import { PatientPersistenceMapper } from '../persistence/patient.persistence-mapper';

/** Explainable duplicate detection adapter using exact indexed identity signals. */
@Injectable()
export class PrismaDuplicateDetectionAdapter implements DuplicateDetectionPort {
  constructor(
    private readonly transactionManager: PrismaTransactionManager,
    private readonly mapper: PatientPersistenceMapper,
  ) {}

  /** Finds existing identities sharing high-confidence identity attributes. */
  async detect(patient: Patient): Promise<readonly DuplicateCandidate[]> {
    const where: Prisma.PatientWhereInput = {
      OR: [
        { enterprisePatientNumber: patient.enterprisePatientNumber.value },
        { hospitalNumber: patient.hospitalNumber.value },
        ...(patient.phoneNumber
          ? [{ phoneNumber: patient.phoneNumber.value }]
          : []),
        {
          identifiers: {
            some: {
              value: {
                in: patient.identifiers.map((identifier) => identifier.value),
              },
            },
          },
        },
      ],
    };
    const records = await this.transactionManager.getClient().patient.findMany({
      where,
      include: { identifiers: true },
      take: 25,
    });
    return records
      .filter((record) => record.id !== patient.patientId.value)
      .map((record) => {
        const candidate = this.mapper.fromPersistence(record);
        return {
          patientId: candidate.patientId.value,
          confidenceBand: 'high',
          evidence: {
            match: 'exact enterprise, hospital, phone, or identifier match',
          },
        };
      });
  }
}
