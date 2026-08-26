/** Discriminated union representing a successful or failed operation outcome. */
export type Result<TValue, TError = Error> =
  | {
      readonly success: true;
      readonly value: TValue;
    }
  | {
      readonly success: false;
      readonly error: TError;
    };

/** Creates immutable result values for platform and domain-independent code. */
export class ResultFactory {
  /** Creates a successful result value. */
  static ok<TValue>(value: TValue): Result<TValue, never> {
    return {
      success: true,
      value,
    };
  }

  /** Creates a failed result value. */
  static fail<TError>(error: TError): Result<never, TError> {
    return {
      success: false,
      error,
    };
  }
}
