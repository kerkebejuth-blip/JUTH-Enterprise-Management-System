/** Domain-independent immutable value object base class. */
export abstract class BaseValueObject<TProperties extends object> {
  protected constructor(public readonly properties: Readonly<TProperties>) {}

  /** Compares value objects using their serialized property values. */
  equals(other: BaseValueObject<TProperties> | undefined): boolean {
    if (!other) {
      return false;
    }

    return JSON.stringify(this.properties) === JSON.stringify(other.properties);
  }
}
