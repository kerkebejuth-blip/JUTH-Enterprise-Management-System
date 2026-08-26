import type { Clock } from '../../../../shared/domain';
import { PrismaTransactionManager } from '../../../../infrastructure/transactions';
import { InfrastructureException } from '../../../../filters/exceptions';
import { PatientPersistenceMapper } from '../persistence/patient.persistence-mapper';
import { PrismaPatientRepository } from './prisma-patient.repository';
import { createPatientInfrastructureFixture } from '../testing/patient-infrastructure.fixture';

class RepositoryClock implements Clock {
  now(): Date {
    return new Date('2026-08-02T10:00:00.000Z');
  }

  nowIso(): string {
    return this.now().toISOString();
  }
}

describe('PrismaPatientRepository', () => {
  it('loads a patient through one aggregate query with identifiers included', async () => {
    const patient = createPatientInfrastructureFixture();
    const mapper = new PatientPersistenceMapper(new RepositoryClock());
    const stored = {
      ...mapper.toCreateData(patient),
      createdAt: new Date('2026-08-02T10:00:00.000Z'),
      updatedAt: new Date('2026-08-02T10:00:00.000Z'),
      identifiers: [],
    };
    const findUnique = jest.fn().mockResolvedValue(stored);
    const client = {
      patient: { findUnique },
    } as unknown as ReturnType<PrismaTransactionManager['getClient']>;
    const transactionManager = Object.create(
      PrismaTransactionManager.prototype,
    ) as PrismaTransactionManager;
    jest.spyOn(transactionManager, 'getClient').mockReturnValue(client);
    const repository = new PrismaPatientRepository(transactionManager, mapper);

    const result = await repository.findById(patient.patientId.value);

    expect(result?.patientId.value).toBe(patient.patientId.value);
    expect(findUnique).toHaveBeenCalledWith({
      where: { id: patient.patientId.value },
      include: { identifiers: true },
    });
  });

  it('refuses physical deletion to preserve legal patient history', () => {
    const transactionManager = Object.create(
      PrismaTransactionManager.prototype,
    ) as PrismaTransactionManager;
    const repository = new PrismaPatientRepository(
      transactionManager,
      new PatientPersistenceMapper(new RepositoryClock()),
    );

    expect(() => repository.delete('patient-1')).toThrow(
      InfrastructureException,
    );
  });
});
