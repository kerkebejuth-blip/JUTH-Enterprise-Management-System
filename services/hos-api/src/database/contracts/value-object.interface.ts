/** Value object contract for immutable domain values. */
export interface ValueObject<TValue> {
  equals(other: TValue): boolean;
}
