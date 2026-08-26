/** Guard utilities for defensive domain and application validation. */
export class Guard {
  /** Returns true when a value is neither null nor undefined. */
  static isDefined<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  /** Throws when a value is null or undefined. */
  static againstNullOrUndefined<TValue>(
    value: TValue | null | undefined,
    name: string,
  ): TValue {
    if (!this.isDefined(value)) {
      throw new Error(`${name} must be defined.`);
    }

    return value;
  }

  /** Throws when a string is empty or whitespace only. */
  static againstEmptyString(value: string, name: string): string {
    if (value.trim().length === 0) {
      throw new Error(`${name} must not be empty.`);
    }

    return value;
  }
}
