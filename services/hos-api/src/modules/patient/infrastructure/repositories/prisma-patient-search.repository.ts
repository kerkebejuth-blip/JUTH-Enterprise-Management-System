import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import type { PageResult } from '../../../../database/pagination';
import { PrismaTransactionManager } from '../../../../infrastructure/transactions';
import type { Patient } from '../../domain';
import type {
  PatientSearchCriteria,
  PatientSearchPort,
} from '../../application/ports';
import { PatientPersistenceMapper } from '../persistence/patient.persistence-mapper';

/** Indexed Prisma search adapter for clinic-neutral Patient identity search. */
@Injectable()
export class PrismaPatientSearchRepository implements PatientSearchPort {
  constructor(
    private readonly transactionManager: PrismaTransactionManager,
    private readonly mapper: PatientPersistenceMapper,
  ) {}

  /** Executes one bounded search and one count query with no N+1 loading. */
  async search(criteria: PatientSearchCriteria): Promise<PageResult<Patient>> {
    const term = criteria.term.trim();
    const where: Prisma.PatientWhereInput = {
      OR: [
        { enterprisePatientNumber: contains(term) },
        { hospitalNumber: contains(term) },
        { familyName: contains(term) },
        { givenNames: contains(term) },
        { phoneNumber: contains(term) },
        { emailAddress: contains(term) },
        { identifiers: { some: { value: contains(term) } } },
      ],
    };
    const page = Math.max(criteria.page, 1);
    const pageSize = Math.min(Math.max(criteria.pageSize, 1), 100);
    const [records, total] = await Promise.all([
      this.transactionManager.getClient().patient.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: orderBy(criteria),
        include: { identifiers: true },
      }),
      this.transactionManager.getClient().patient.count({ where }),
    ]);

    return {
      items: records.map((record) => this.mapper.fromPersistence(record)),
      total,
      page,
      pageSize,
    };
  }
}

function contains(term: string): Prisma.StringFilter {
  return { contains: term, mode: 'insensitive' };
}

function orderBy(
  criteria: PatientSearchCriteria,
): Prisma.PatientOrderByWithRelationInput {
  const direction = criteria.sortOrder ?? 'asc';
  switch (criteria.sortBy) {
    case 'hospitalNumber':
      return { hospitalNumber: direction };
    case 'updatedAt':
      return { updatedAt: direction };
    case 'name':
    default:
      return { familyName: direction };
  }
}
