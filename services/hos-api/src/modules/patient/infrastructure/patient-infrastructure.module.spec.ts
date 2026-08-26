import { Test } from '@nestjs/testing';

import { AppModule } from '../../../app.module';
import { PrismaRepositoryFactory } from '../../../infrastructure/repositories';
import { PrismaPatientRepository } from './repositories';

describe('Patient infrastructure module', () => {
  it('registers the Patient repository in the enterprise factory', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const factory = moduleRef.get(PrismaRepositoryFactory);
    expect(factory.getRepository('patient')).toBeInstanceOf(
      PrismaPatientRepository,
    );

    await moduleRef.close();
  });
});
