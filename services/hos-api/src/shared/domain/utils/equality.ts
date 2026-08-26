/** Equality helpers for domain-neutral collection and value comparisons. */
export class Equality {
  /** Compares two arrays using strict equality for each item in order. */
  static arraysEqual<TValue>(
    left: readonly TValue[],
    right: readonly TValue[],
  ): boolean {
    return (
      left.length === right.length &&
      left.every((value, index) => value === right[index])
    );
  }
}
