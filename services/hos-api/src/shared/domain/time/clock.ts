/** Time provider abstraction for domain models and application services. */
export interface Clock {
  now(): Date;
  nowIso(): string;
}

/** System-backed clock implementation for runtime infrastructure. */
export class SystemClock implements Clock {
  /** Returns the current system time. */
  now(): Date {
    return new Date();
  }

  /** Returns the current system time as an ISO-8601 string. */
  nowIso(): string {
    return this.now().toISOString();
  }
}
