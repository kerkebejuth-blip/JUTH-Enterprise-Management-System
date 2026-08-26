import { UuidGenerator } from './identifier-generator';

describe('UuidGenerator', () => {
  it('generates UUID identifiers', () => {
    const generator = new UuidGenerator();

    expect(generator.generate()).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });
});
