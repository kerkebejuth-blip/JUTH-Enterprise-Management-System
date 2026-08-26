import { Injectable } from '@nestjs/common';
import type { PageRequest, PageResult } from '../../../../database/pagination';
import { ConcurrencyConflictException } from '../../../../database/optimistic-locking';
import { InfrastructureException } from '../../../../filters/exceptions';
import type { Repository, Specification } from '../../../../shared/domain';
import type { Patient } from '../../domain';
import { PrismaTransactionManager } from '../../../../infrastructure/transactions';
import { PatientPersistenceMapper } from '../persistence/patient.persistence-mapper';

/** Prisma repository for the Patient identity aggregate. */
@Injectable()
export class PrismaPatientRepository implements Repository<Patient, string> {
  constructor(
    private readonly transactionManager: PrismaTransactionManager,
    private readonly mapper: PatientPersistenceMapper,
  ) {}

  /** Loads one patient and its normalized identifiers by UUID. */
  async findById(id: string): Promise<Patient | null> {
    const record = await this.transactionManager
      .getClient()
      .patient.findUnique({
        where: { id },
        include: { identifiers: true },
      });
    return record ? this.mapper.fromPersistence(record) : null;
  }

  /** Finds the first patient satisfying a domain specification. */
  async findOne(
    specification: Specification<Patient>,
  ): Promise<Patient | null> {
    const patients = await this.findMany(specification);
    return patients[0] ?? null;
  }

  /** Loads a bounded set and applies provider-independent domain filtering. */
  async findMany(
    specification: Specification<Patient>,
  ): Promise<readonly Patient[]> {
    const records = await this.transactionManager.getClient().patient.findMany({
      include: { identifiers: true },
    });
    return records
      .map((record) => this.mapper.fromPersistence(record))
      .filter((patient) => specification.isSatisfiedBy(patient));
  }

  /** Returns a deterministic page without N+1 identifier queries. */
  async paginate(
    specification: Specification<Patient>,
    pageRequest: PageRequest,
  ): Promise<PageResult<Patient>> {
    const allMatches = await this.findMany(specification);
    const start = (pageRequest.page - 1) * pageRequest.pageSize;
    return {
      items: allMatches.slice(start, start + pageRequest.pageSize),
      total: allMatches.length,
      page: pageRequest.page,
      pageSize: pageRequest.pageSize,
    };
  }

  /** Creates or updates a patient aggregate with optimistic version data. */
  async save(patient: Patient): Promise<Patient> {
    const client = this.transactionManager.getClient();
    const existing = await client.patient.findUnique({
      where: { id: patient.patientId.value },
      select: { id: true, version: true },
    });

    if (!existing) {
      const created = await client.patient.create({
        data: this.mapper.toCreateData(patient),
        include: { identifiers: true },
      });
      return this.mapper.fromPersistence(created);
    }

    const updated = await client.patient.updateMany({
      where: {
        id: patient.patientId.value,
        version: patient.version - 1,
      },
      data: this.mapper.toUpdateData(patient),
    });
    if (updated.count !== 1) {
      throw new ConcurrencyConflictException(
        'Patient version conflict detected during persistence.',
        { patientId: patient.patientId.value, version: patient.version },
      );
    }

    const saved = await this.findById(patient.patientId.value);
    if (!saved) {
      throw new InfrastructureException(
        `Patient disappeared after persistence: ${patient.patientId.value}.`,
      );
    }
    return saved;
  }

  /** Refuses physical deletion because patient identity history is retained. */
  delete(id: string): Promise<void> {
    throw new InfrastructureException(
      `Physical deletion is not permitted for Patient identity: ${id}.`,
    );
  }
}
