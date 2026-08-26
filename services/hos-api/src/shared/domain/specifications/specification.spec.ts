import { CompositeSpecification } from './specification';

interface TestCandidate {
  readonly active: boolean;
  readonly score: number;
}

class ActiveSpecification extends CompositeSpecification<TestCandidate> {
  isSatisfiedBy(candidate: TestCandidate): boolean {
    return candidate.active;
  }
}

class HighScoreSpecification extends CompositeSpecification<TestCandidate> {
  isSatisfiedBy(candidate: TestCandidate): boolean {
    return candidate.score >= 70;
  }
}

describe('Specification', () => {
  const active = new ActiveSpecification();
  const highScore = new HighScoreSpecification();

  it('composes specifications with logical and', () => {
    const specification = active.and(highScore);

    expect(specification.isSatisfiedBy({ active: true, score: 80 })).toBe(true);
    expect(specification.isSatisfiedBy({ active: true, score: 40 })).toBe(
      false,
    );
  });

  it('composes specifications with logical or', () => {
    const specification = active.or(highScore);

    expect(specification.isSatisfiedBy({ active: false, score: 80 })).toBe(
      true,
    );
    expect(specification.isSatisfiedBy({ active: false, score: 40 })).toBe(
      false,
    );
  });

  it('negates specifications', () => {
    const specification = active.not();

    expect(specification.isSatisfiedBy({ active: false, score: 80 })).toBe(
      true,
    );
    expect(specification.isSatisfiedBy({ active: true, score: 80 })).toBe(
      false,
    );
  });
});
