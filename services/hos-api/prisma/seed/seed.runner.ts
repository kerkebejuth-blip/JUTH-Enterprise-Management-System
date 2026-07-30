import type { SeedContributor } from './seed.interface';

const contributors: SeedContributor[] = [];

async function runSeeds(): Promise<void> {
  for (const contributor of contributors) {
    await contributor.run();
  }
}

void runSeeds();
