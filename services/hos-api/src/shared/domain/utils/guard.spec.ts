import { Collection } from './collection';
import { Equality } from './equality';
import { Guard } from './guard';

describe('Domain utilities', () => {
  it('guards required values', () => {
    expect(Guard.againstNullOrUndefined('value', 'field')).toBe('value');
    expect(() => Guard.againstNullOrUndefined(undefined, 'field')).toThrow(
      'field must be defined.',
    );
    expect(() => Guard.againstEmptyString(' ', 'field')).toThrow(
      'field must not be empty.',
    );
  });

  it('compares arrays by value order', () => {
    expect(Equality.arraysEqual(['a', 'b'], ['a', 'b'])).toBe(true);
    expect(Equality.arraysEqual(['a', 'b'], ['b', 'a'])).toBe(false);
  });

  it('provides domain-neutral collection helpers', () => {
    expect(Collection.unique(['a', 'a', 'b'])).toEqual(['a', 'b']);
    expect(Collection.chunk(['a', 'b', 'c'], 2)).toEqual([['a', 'b'], ['c']]);
  });
});
